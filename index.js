let fs = require("fs");
let mysql = require("mysql");
let moment = require("moment");
let express = require("express");
let jwt = require("jsonwebtoken");
let cookieParser = require("cookie-parser");
let jsonn = require("./key.json");
let app = express();

let key = fs.readFileSync(__dirname + "/certsFiles/selfsigned.key");
let cert = fs.readFileSync(__dirname + "/certsFiles/selfsigned.crt");
let credentials = {
  key: key,
  cert: cert,
};
let https = require("https").createServer(credentials, app);
let httpsPort = 3010;
https.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort);
});
let io = require("socket.io")(https, {
  cors: {
    origin: [
      "https://storage.sunnyhome.site",
      "https://www.storage.sunnyhome.site",
    ],
    methods: ["GET", "POST"],
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  let allowedOrigins = [
    "https://storage.sunnyhome.site",
    "https://www.storage.sunnyhome.site",
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "store",
  multipleStatements: true,
});

let token = jwt.sign({ token: jsonn.token }, jsonn.key);

app.post("/tok", function (req, res) {
  if (req.cookies.token) {
    return res.send(token);
  }
  res.send(false);
});

app.post("/post0", function (req, res) {
  let a = req.body.user;
  let b = req.body.psw;
  let c = false;
  if (a === "store" && b === jsonn.pass) {
    c = token;
    res.cookie("token", token, { secure: true, httpOnly: true });
  }
  res.send(c);
});

io.on("connection", (socket) => {
  socket.on("post1", (req) => {
    let obj = req;
    let x = obj.insertJob;
    let y = obj.clientName;
    let date;
    let d = new Date();
    let t = Number(x);
    let m = t.toFixed(5);
    date = moment(d).format("YYYY-MM-DD HH:mm:ss");
    pool.query(
      "SELECT jobNum From store.jobBook WHERE jobNum = '" + x + "'",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post1", { e: error });
        } else if (!error && !results.length) {
          pool.query(
            "INSERT INTO store.jobBook (jobNum, clientName) VALUES ( '" +
              x +
              "', '" +
              y +
              "' )",
            function (error, results) {
              if (error) {
                return io.to(socket.id).emit("post1", { e: error });
              } else if (!error && results) {
                pool.query(
                  "CREATE TABLE store." +
                    x +
                    " ( ID DECIMAL(10, 5), jobNum INT UNSIGNED, clientName CHAR(128), entryDesc varchar(2500), entryDate DATETIME, entryContainer CHAR(25), Cked_Out TINYINT UNSIGNED DEFAULT 2, checkedOutDate DATETIME, PRIMARY KEY (ID, jobNum, clientName), FOREIGN KEY (jobNum, clientName) REFERENCES store.jobBook(jobNum, clientName))",
                  function (error, results) {
                    if (error) {
                      return io.to(socket.id).emit("post1", { e: error });
                    } else if (!error && results) {
                      pool.query(
                        "INSERT INTO store." +
                          x +
                          " (ID, jobNum, clientName, entryDesc, entryDate, entryContainer, Cked_Out ) VALUES ('" +
                          m +
                          "', '" +
                          x +
                          "', '" +
                          y +
                          "', 'Original Record', '" +
                          date +
                          "', 'Container = N/A', 3)",
                        function (error, results) {
                          if (error) {
                            return io.to(socket.id).emit("post1", { e: error });
                          } else if (!error && results) {
                            return io.to(socket.id).emit("post1", {
                              u: [{ Updated: x, Client: y, In_D: date }],
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          return io.to(socket.id).emit("post1", {
            e: {
              code: "IS_NOT_VALID",
              sqlMessage: "jobNum  '" + x + "' duplicate_entry",
            },
          });
        }
      }
    );
  });

  socket.on("post2", (req) => {
    let obj = req;
    let x = obj.insertJob;
    let y = obj.descrip;
    let i = obj.cont;
    let date;
    let d1 = new Date();
    date = moment(d1).format("YYYY-MM-DD HH:mm:ss");
    pool.query(
      "SELECT MAX(ID) FROM store." + x + "",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post2", { e: error });
        } else if (!error && results.length) {
          let n = results[0]["MAX(ID)"];
          let t = Number(n);
          let e = t + 0.00001;
          let q = Number(x);
          let r = q + 1 - 0.00001;
          if (t < r) {
            pool.query(
              "SELECT clientName From store.jobBook WHERE jobNum = '" + x + "'",
              function (error, results) {
                if (error) {
                  return io.to(socket.id).emit("post2", { e: error });
                } else if (!error && results.length) {
                  let h = results[0].clientName;
                  pool.query(
                    "INSERT INTO store." +
                      x +
                      " (ID, jobNum, clientName, entryDesc, entryDate, entryContainer) VALUES ('" +
                      e +
                      "','" +
                      x +
                      "', '" +
                      h +
                      "', '" +
                      y +
                      "', '" +
                      date +
                      "', '" +
                      i +
                      "')",
                    function (error, results) {
                      if (error) {
                        return io.to(socket.id).emit("post2", { e: error });
                      } else if (!error && results) {
                        let k = e.toFixed(5);
                        return io.to(socket.id).emit("post2", {
                          u: [
                            {
                              Updated: x,
                              ID: k,
                              Details: y,
                              In_D: date,
                              Container: i,
                            },
                          ],
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            return io.to(socket.id).emit("post2", {
              e: {
                code: "IS_NOT_VALID",
                sqlMessage: "ID  '" + e + "' has reach MAX(ID)",
              },
            });
          }
        }
      }
    );
  });

  socket.on("post3", (req) => {
    let obj = req;
    let x = obj.insertJobID;
    let y = obj.posi;
    let z = obj.weight;
    let f = Math.floor(x);
    pool.query(
      "SELECT ID, Cked_Out, jobNum, clientName FROM store." +
        f +
        " WHERE ID = " +
        x +
        "",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post3", { e: error });
        } else if (!error && results.length) {
          if (results[0].Cked_Out === 2) {
            pool.query(
              "INSERT INTO store.posiInfo (ID, posiPosition, posiWeight,jobNum, clientName  ) VALUES ('" +
                x +
                "', '" +
                y +
                "', '" +
                z +
                "', '" +
                results[0].jobNum +
                "','" +
                results[0].clientName +
                "')",
              function (error, results) {
                if (error) {
                  return io.to(socket.id).emit("post3", { e: error });
                } else if (!error && results) {
                  pool.query(
                    "UPDATE store." +
                      f +
                      " SET Cked_Out = 1, checkedOutDate = NULL WHERE ID = " +
                      x +
                      "",
                    function (error, results) {
                      if (error) {
                        return io.to(socket.id).emit("post3", { e: error });
                      } else if (!error && results) {
                        return io.to(socket.id).emit("post3", {
                          u: [{ Updated: f, ID: x, Position: y, Weight: z }],
                        });
                      }
                    }
                  );
                }
              }
            );
          } else if (results[0].Cked_Out === 1) {
            pool.query(
              "UPDATE store.posiInfo SET posiPosition = '" +
                y +
                "', posiWeight = " +
                z +
                " WHERE ID = " +
                x +
                "",
              function (error, results) {
                if (error) {
                  return io.to(socket.id).emit("post3", { e: error });
                } else if (!error && results) {
                  return io.to(socket.id).emit("post3", {
                    u: [{ Updated: f, ID: x, Position: y, Weight: z }],
                  });
                }
              }
            );
          } else if (results[0].Cked_Out === 0) {
            pool.query(
              "INSERT INTO store.posiInfo (ID, posiPosition, posiWeight,jobNum, clientName  ) VALUES ('" +
                x +
                "', '" +
                y +
                "', '" +
                z +
                "', '" +
                results[0].jobNum +
                "' , '" +
                results[0].clientName +
                "' )",
              function (error, results) {
                if (error) {
                  return io.to(socket.id).emit("post3", { e: error });
                } else if (!error && results) {
                  pool.query(
                    "UPDATE store." +
                      f +
                      " SET Cked_Out = 1, checkedOutDate = NULL WHERE ID = " +
                      x +
                      "",
                    function (error, results) {
                      if (error) {
                        return io.to(socket.id).emit("post3", { e: error });
                      } else if (!error && results) {
                        return io.to(socket.id).emit("post3", {
                          u: [{ Updated: f, ID: x, Position: y, Weight: z }],
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        } else {
          return io.to(socket.id).emit("post3", {
            e: {
              code: "IS_NOT_VALID",
              sqlMessage: "ID  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post4", (req) => {
    let obj = req;
    let x = obj.insertJobID;
    let y = Math.floor(x);
    let date;
    let d1 = new Date();
    date = moment(d1).format("YYYY-MM-DD HH:mm:ss");
    pool.query(
      "SELECT ID FROM store." + y + " WHERE ID = " + x + "",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post4", { e: error });
        } else if (!error && results.length) {
          pool.query(
            "UPDATE store." +
              y +
              " SET Cked_Out = 0, checkedOutDate = '" +
              date +
              "' WHERE ID = '" +
              x +
              "'",
            function (error, results) {
              if (error) {
                return io.to(socket.id).emit("post4", { e: error });
              } else if (!error && results) {
                pool.query(
                  "DELETE FROM store.posiInfo WHERE ID = " + x + "",
                  function (error, results) {
                    if (error) {
                      return io.to(socket.id).emit("post4", { e: error });
                    } else if (!error && results) {
                      return io.to(socket.id).emit("post4", {
                        u: [{ Cked_Out: x, Out_D: date }],
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          return io.to(socket.id).emit("post4", {
            e: {
              code: " IS_NOT_VALID",
              sqlMessage: "ID  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post5", (req) => {
    let obj = req;
    let x = obj.clientName;
    pool.query(
      "SELECT clientName FROM store.jobBook WHERE clientName = '" + x + "'",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post5", { e: error });
        } else if (!error && results.length) {
          pool.query(
            "SELECT jobNum, clientName FROM store.jobBook WHERE clientName = '" +
              x +
              "'",
            function (error, results) {
              if (error) {
                return io.to(socket.id).emit("post5", { e: error });
              } else if (!error && results.length) {
                let resul = [];
                let w = results.length;
                for (let op = 0; op < w; op++) {
                  resul.push({
                    jobNum: results[op].jobNum,
                    clientName: results[op].clientName,
                  });
                }
                return io.to(socket.id).emit("post5", { u: resul });
              }
            }
          );
        } else {
          return io.to(socket.id).emit("post5", {
            e: {
              code: " IS_NOT_VALID",
              sqlMessage: "clientName  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post6", (req) => {
    let obj = req;
    let x = obj.insertJob;
    let y = obj.sumc;
    if (y === "Cecked Out") {
      pool.query(
        "SELECT * FROM store." + x + " WHERE Cked_Out = 0",
        function (error, results) {
          if (error) {
            return io.to(socket.id).emit("post6", { e: error });
          } else if (!error && results.length) {
            let resul = [];
            let w = results.length;
            for (let op = 0; op < w; op++) {
              let cod = moment(results[op]["checkedOutDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              let ed = moment(results[op]["entryDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              resul.push({
                ID: results[op].ID,
                jobNum: results[op].jobNum,
                clientName: results[op].clientName,
                entryDesc: results[op].entryDesc,
                entryContainer: results[op].entryContainer,
                entryDate: ed,
                checkedOutDate: cod,
              });
            }
            return io.to(socket.id).emit("post6", { u: resul });
          } else if (!error && !results.length) {
            return io.to(socket.id).emit("post6", {
              e: {
                code: " IS_NOT_VALID",
                sqlMessage: "Cked_Out  '" + x + "' doesn't exist",
              },
            });
          }
        }
      );
    } else if (y === "In Position") {
      pool.query(
        "SELECT * FROM store." +
          x +
          " INNER JOIN store.posiInfo ON store." +
          x +
          ".ID = store.posiInfo.ID",
        function (error, results) {
          if (error) {
            return io.to(socket.id).emit("post6", { e: error });
          } else if (!error && results.length) {
            let resul = [];
            let w = results.length;
            for (let op = 0; op < w; op++) {
              let cod = moment(results[op]["checkedOutDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              let ed = moment(results[op]["entryDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              resul.push({
                ID: results[op].ID,
                jobNum: results[op].jobNum,
                clientName: results[op].clientName,
                entryDesc: results[op].entryDesc,
                entryContainer: results[op].entryContainer,
                entryDate: ed,
                posiPosition: results[op].posiPosition,
                posiWeight: results[op].posiWeight,
              });
            }
            return io.to(socket.id).emit("post6", { u: resul });
          } else if (!error && !results.length) {
            return io.to(socket.id).emit("post6", {
              e: {
                code: " IS_NOT_VALID",
                sqlMessage: "Cked_IN  '" + x + "' doesn't exist",
              },
            });
          }
        }
      );
    } else if (y === "Un Allocated") {
      pool.query(
        "SELECT * FROM store." + x + " WHERE Cked_Out = 2",
        function (error, results) {
          if (error) {
            return io.to(socket.id).emit("post6", { e: error });
          } else if (!error && results.length) {
            let resul = [];
            let w = results.length;
            for (let op = 0; op < w; op++) {
              let cod = moment(results[op]["checkedOutDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              let ed = moment(results[op]["entryDate"]).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              resul.push({
                ID: results[op].ID,
                jobNum: results[op].jobNum,
                clientName: results[op].clientName,
                entryDesc: results[op].entryDesc,
                entryContainer: results[op].entryContainer,
                entryDate: ed,
              });
            }
            return io.to(socket.id).emit("post6", { u: resul });
          } else if (!error && !results.length) {
            return io.to(socket.id).emit("post6", {
              e: {
                code: " IS_NOT_VALID",
                sqlMessage: "Un_Allocated  '" + x + "' doesn't exist",
              },
            });
          }
        }
      );
    }
  });

  socket.on("post7", (req) => {
    let obj = req;
    let x = obj.descrip;
    let y = obj.insertJob;
    pool.query(
      "SELECT * FROM store." +
        y +
        " INNER JOIN store.posiInfo ON store." +
        y +
        ".ID = store.posiInfo.ID WHERE store." +
        y +
        ".entryDesc LIKE '%" +
        x +
        "%'",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post7", { e: error });
        } else if (!error && results.length) {
          let resul = [];
          let w = results.length;
          for (let op = 0; op < w; op++) {
            let ed = moment(results[op]["entryDate"]).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            resul.push({
              ID: results[op].ID,
              jobNum: results[op].jobNum,
              clientName: results[op].clientName,
              entryDesc: results[op].entryDesc,
              entryContainer: results[op].entryContainer,
              entryDate: ed,
              posiPosition: results[op].posiPosition,
              posiWeight: results[op].posiWeight,
            });
          }
          return io.to(socket.id).emit("post7", { u: resul });
        } else {
          return io.to(socket.id).emit("post7", {
            e: {
              code: " IS_NOT_VALID",
              sqlMessage: "details  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post8", (req) => {
    let obj = req;
    let x = obj.clientName;
    let h = obj.cont;
    pool.query(
      "SELECT jobNum, clientName FROM store.jobBook WHERE clientName = '" +
        x +
        "'",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post8", { e: error });
        } else if (!error && results.length) {
          let w = results.length;
          let t;
          let s = "";
          for (let op = 0; op < w; op++) {
            t = results[op]["jobNum"];
            s +=
              "SELECT * FROM store." +
              t +
              " INNER JOIN store.posiInfo ON store." +
              t +
              ".ID = store.posiInfo.ID WHERE store." +
              t +
              ".entryContainer = '" +
              h +
              "'; ";
          }
          let n = s.lastIndexOf(";");
          let r = s.substr(0, n);
          pool.query("" + r + "", function (error, results) {
            if (error) {
              return io.to(socket.id).emit("post8", { e: error });
            } else if (!error && results.length) {
              let resul = [];
              if (results.length < 2) {
                for (let op in results) {
                  let ed = moment(results[op]["entryDate"]).format(
                    "YYYY-MM-DD HH:mm:ss"
                  );
                  resul.push({
                    ID: results[op].ID,
                    jobNum: results[op].jobNum,
                    clientName: results[op].clientName,
                    entryDesc: results[op].entryDesc,
                    entryContainer: results[op].entryContainer,
                    entryDate: ed,
                    posiPosition: results[op].posiPosition,
                    posiWeight: results[op].posiWeight,
                  });
                }
                return io.to(socket.id).emit("post8", { u: resul });
              } else if (results.length >= 2 && results[0][0]) {
                for (let op in results) {
                  for (let i in results[op]) {
                    let ed = moment(results[op][i]["entryDate"]).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    resul.push({
                      ID: results[op][i].ID,
                      jobNum: results[op][i].jobNum,
                      clientName: results[op][i].clientName,
                      entryDesc: results[op][i].entryDesc,
                      entryContainer: results[op][i].entryContainer,
                      entryDate: ed,
                      posiPosition: results[op][i].posiPosition,
                      posiWeight: results[op][i].posiWeight,
                    });
                  }
                }
                return io.to(socket.id).emit("post8", { u: resul });
              } else {
                return io.to(socket.id).emit("post8", {
                  e: {
                    code: " IS_NOT_VALID",
                    sqlMessage: "entryContainer '" + h + "' doesn't exist",
                  },
                });
              }
            } else {
              return io.to(socket.id).emit("post8", {
                e: {
                  code: " IS_NOT_VALID",
                  sqlMessage: "entryContainer '" + h + "' doesn't exist",
                },
              });
            }
          });
        } else {
          return io.to(socket.id).emit("post8", {
            e: {
              code: " IS_NOT_VALID",
              sqlMessage: "clientName  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post9", (req) => {
    let obj = req;
    let x = obj.delJob;
    pool.query("DROP TABLE store." + x + "", function (error, results) {
      if (error) {
        return io.to(socket.id).emit("post9", { e: error });
      } else if (!error && results) {
        pool.query(
          "DELETE FROM store.posiInfo WHERE jobNum=  " + x + "",
          function (error, results) {
            if (error) {
              return io.to(socket.id).emit("post9", { e: error });
            } else if (!error && results) {
              pool.query(
                "DELETE FROM store.jobBook WHERE jobNum= " + x + "",
                function (error, results) {
                  if (error) {
                    return io.to(socket.id).emit("post9", { e: error });
                  } else if (!error && results) {
                    return io
                      .to(socket.id)
                      .emit("post9", { u: [{ Updated: x }] });
                  }
                }
              );
            }
          }
        );
      } else if (!error && !results) {
        return io.to(socket.id).emit("post9", {
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "Job_Num  '" + x + "' doesn't exist",
          },
        });
      }
    });
  });

  socket.on("post10", (req) => {
    let obj = req;
    let x = obj.delClientName;
    pool.query(
      "SELECT * FROM store.jobBook WHERE clientName=  '" + x + "'",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post10", { e: error });
        } else if (!error && results.length) {
          let w = results.length;
          for (let op = 0; op < w; op++) {
            pool.query(
              " DROP TABLE store." +
                results[op].jobNum +
                "; DELETE FROM store.posiInfo WHERE jobNum=  '" +
                results[op].jobNum +
                "';DELETE FROM store.jobBook WHERE clientName=  '" +
                x +
                "' AND jobNum= '" +
                results[op].jobNum +
                "'",
              function (error, results) {
                if (error) {
                  return io.to(socket.id).emit("post10", { e: error });
                } else if (!error && results) {
                  return io
                    .to(socket.id)
                    .emit("post10", { u: [{ Updated: x }] });
                }
              }
            );
          }
        } else if (!error && !results.length) {
          return io.to(socket.id).emit("post10", {
            e: {
              code: " IS_NOT_VALID",
              sqlMessage: "client_Name  '" + x + "' doesn't exist",
            },
          });
        }
      }
    );
  });

  socket.on("post11", () => {
    pool.query(
      "SELECT * FROM store.jobBook ORDER BY clientName",
      function (error, results) {
        if (error) {
          return io.to(socket.id).emit("post11", { e: error });
        } else if (!error && results.length) {
          let resul = [];
          let w = results.length;
          for (let op = 0; op < w; op++) {
            resul.push({
              jobNum: results[op].jobNum,
              clientName: results[op].clientName,
            });
          }
          return io.to(socket.id).emit("post11", { u: resul });
        } else {
          return io.to(socket.id).emit("post11", {
            e: {
              code: "IS_NOT_VALID",
              sqlMessage: "No Data",
            },
          });
        }
      }
    );
  });

  socket.on("post12", (req) => {
    let obj = req;
    let x = obj.posii;
    pool.query(
      "SELECT * FROM store.posiInfo WHERE posiPosition= '" + x + "'",
      function (error, results) {
        if (error) {
          return res.JSON({ e: "error" });
        } else if (!error && results.length) {
          let resul = [];
          let w = results.length;
          for (let op = 0; op < w; op++) {
            resul.push({
              ID: results[op].ID,
              posiPosition: results[op].posiPosition,
              posiWeight: results[op].posiWeight,
              jobNum: results[op].jobNum,
              clientName: results[op].clientName,
            });
          }
          return io.to(socket.id).emit("post12", { u: resul });
        } else {
          return io.to(socket.id).emit("post12", {
            e: {
              code: "IS_NOT_VALID",
              sqlMessage: "No Data",
            },
          });
        }
      }
    );
  });

  socket.on("post13", (req) => {
    let loc = fs.readFileSync("/home/ubuntu/files/positions/positions.json");
    let a = JSON.parse(loc);
    a = a.positions;
    let resul = [];
    let w = a.length;
    if (w) {
      for (let op = 0; op < w; op++) {
        resul.push({
          Positions: a[op],
        });
      }
      return io.to(socket.id).emit("post13", { u: resul });
    } else {
      return io.to(socket.id).emit("post13", {
        e: {
          code: "IS_NOT_VALID",
          sqlMessage: "No Data",
        },
      });
    }
  });

  socket.on("post14", (req) => {
    pool.query("SELECT * FROM store.posiInfo", function (error, results) {
      if (error) {
        return res.JSON({ e: "error" });
      } else if (!error && results.length) {
        let loc = fs.readFileSync(
          "/home/ubuntu/files/positions/positions.json"
        );
        let loc1 = JSON.parse(loc);
        let filtered = loc1.positions.filter(
          (item) => !results.map((item) => item.posiPosition).includes(item)
        );
        filtered = filtered.map((item) => {
          return { Positions: item };
        });
        return io.to(socket.id).emit("post14", { u: filtered });
      } else {
        return io.to(socket.id).emit("post14", {
          e: {
            code: "IS_NOT_VALID",
            sqlMessage: "No Data",
          },
        });
      }
    });
  });

  socket.on("post15", (req) => {
    pool.query(
      "SELECT * FROM store.posiInfo ORDER BY posiPosition",
      function (error, results) {
        if (error) {
          return res.JSON({ e: "error" });
        } else if (!error && results.length) {
          let resul = [];
          let w = results.length;
          for (let op = 0; op < w; op++) {
            resul.push({
              ID: results[op].ID,
              posiPosition: results[op].posiPosition,
              posiWeight: results[op].posiWeight,
              jobNum: results[op].jobNum,
              clientName: results[op].clientName,
            });
          }
          return io.to(socket.id).emit("post15", { u: resul });
        } else {
          return io.to(socket.id).emit("post15", {
            e: {
              code: "IS_NOT_VALID",
              sqlMessage: "No Data",
            },
          });
        }
      }
    );
  });

  socket.on("post16", (req) => {
    let obj = req;
    let x = obj.posizero || obj.posione;
    function res() {
      let loc = fs.readFileSync("/home/ubuntu/files/positions/positions.json");
      let loc1 = JSON.parse(loc);
      let f = x.toUpperCase();
      let c = loc1.positions.filter((match) => match.includes(f));
      let g = [f];
      if (c[0] === g[0]) {
        return g[0];
      } else {
        return false;
      }
    }
    if (obj.posizero) {
      return io.to(socket.id).emit("post16", { zero: res() });
    }
    if (obj.posione) {
      return io.to(socket.id).emit("post16", { one: res() });
    }
  });
});
