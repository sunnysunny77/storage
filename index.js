let fs = require("fs");
let key = fs.readFileSync(__dirname + "/certsFiles/selfsigned.key");
let cert = fs.readFileSync(__dirname + "/certsFiles/selfsigned.crt");
let credentials = {
  key: key,
  cert: cert,
};

let app = require("express")();
let https = require("https").createServer(credentials, app);
let httpsPort = 3010;

https.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort);
});

let bodyParser = require("body-parser");
let mysql = require("mysql");
let moment = require("moment");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  let allowedOrigins = [
    "https:////",
    "https://www./",
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

app.post("/post0", function (req, res) {
  let a = req.body.user;
  let b = req.body.psw;
  let c = false;
  if (a === "store" && b === "[S5gw/:^}-gbWSrK") {
    c = true;
  }
  res.json(c);
});

app.post("/post1", function (req, res) {
  let obj = req.body;
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
        return res.json({ e: error });
      } else if (!error && !results.length) {
        pool.query(
          "INSERT INTO store.jobBook (jobNum, clientName) VALUES ( '" +
            x +
            "', '" +
            y +
            "' )",
          function (error, results) {
            if (error) {
              return res.json({ e: error });
            } else if (!error && results) {
              pool.query(
                "CREATE TABLE store." +
                  x +
                  " ( ID DECIMAL(10, 5), jobNum INT UNSIGNED, clientName CHAR(128), entryDesc varchar(2500), entryDate DATETIME, entryContainer CHAR(25), Cked_Out TINYINT UNSIGNED DEFAULT 2, checkedOutDate DATETIME, PRIMARY KEY (ID, jobNum, clientName), FOREIGN KEY (jobNum, clientName) REFERENCES store.jobBook(jobNum, clientName))",
                function (error, results) {
                  if (error) {
                    return res.json({ e: error });
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
                          return res.json({ e: error });
                        } else if (!error && results) {
                          return res.json({
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
        return res.json({
          e: {
            code: "IS_NOT_VALID",
            sqlMessage: "jobNum  '" + x + "' duplicate_entry",
          },
        });
      }
    }
  );
});

app.post("/post2", function (req, res) {
  let obj = req.body;
  let x = obj.insertJob;
  let y = obj.descrip;
  let i = obj.cont;
  let date;
  let d1 = new Date();
  date = moment(d1).format("YYYY-MM-DD HH:mm:ss");
  pool.query("SELECT MAX(ID) FROM store." + x + "", function (error, results) {
    if (error) {
      return res.json({ e: error });
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
              return res.json({ e: error });
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
                    return res.json({ e: error });
                  } else if (!error && results) {
                    let k = e.toFixed(5);
                    return res.json({
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
        return res.json({
          e: {
            code: "IS_NOT_VALID",
            sqlMessage: "ID  '" + e + "' has reach MAX(ID)",
          },
        });
      }
    }
  });
});

app.post("/post3", function (req, res) {
  let obj = req.body;
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
        return res.json({ e: error });
      } else if (!error && results.length) {
        if (results[0].Cked_Out === 2) {
          pool.query(
            "INSERT INTO posiInfo (ID, posiPosition, posiWeight,jobNum, clientName  ) VALUES ('" +
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
                return res.json({ e: error });
              } else if (!error && results) {
                pool.query(
                  "UPDATE store." +
                    f +
                    " SET Cked_Out = 1, checkedOutDate = NULL WHERE ID = " +
                    x +
                    "",
                  function (error, results) {
                    if (error) {
                      return res.json({ e: error });
                    } else if (!error && results) {
                      let t = Number(x);
                      let m = t.toFixed(5);
                      return res.json({
                        u: [{ Updated: f, ID: m, Position: y, Weight: z }],
                      });
                    }
                  }
                );
              }
            }
          );
        }else if (results[0].Cked_Out === 1) {
          pool.query(
            "UPDATE posiInfo SET posiPosition = '" +
            y +
            "', posiWeight = " +
            z +
            " WHERE ID = " +
              x +
              "",
            function (error, results) {
              if (error) {
                return res.json({ e: error });
              } else if (!error && results) {
                let t = Number(x);
                let m = t.toFixed(5);
                return res.json({
                  u: [{ Updated: f, ID: m, Position: y, Weight: z }],
                });
              }
            }
          );
        
        } else if (results[0].Cked_Out === 0) {
          pool.query(
            "INSERT INTO posiInfo (ID, posiPosition, posiWeight,jobNum, clientName  ) VALUES ('" +
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
                return res.json({ e: error });
              } else if (!error && results) {
                pool.query(
                  "UPDATE store." +
                    f +
                    " SET Cked_Out = 1, checkedOutDate = NULL WHERE ID = " +
                    x +
                    "",
                  function (error, results) {
                    if (error) {
                      return res.json({ e: error });
                    } else if (!error && results) {
                      let t = Number(x);
                      let m = t.toFixed(5);
                      return res.json({
                        u: [{ Updated: f, ID: m, Position: y, Weight: z }],
                      });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        let t = Number(x);
        let m = t.toFixed(5);
        return res.json({
          e: {
            code: "IS_NOT_VALID",
            sqlMessage: "ID  '" + m + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post4", function (req, res) {
  let obj = req.body;
  let x = obj.insertJobID;
  let y = Math.floor(x);
  let date;
  let d1 = new Date();
  date = moment(d1).format("YYYY-MM-DD HH:mm:ss");
  pool.query(
    "SELECT ID FROM store." + y + " WHERE ID = " + x + "",
    function (error, results) {
      if (error) {
        return res.json({ e: error });
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
              return res.json({ e: error });
            } else if (!error && results) {
              pool.query(
                "DELETE FROM store.posiInfo WHERE ID = " + x + "",
                function (error, results) {
                  if (error) {
                    return res.json({ e: error });
                  } else if (!error && results) {
                    let t = Number(x);
                    let m = t.toFixed(5);
                    return res.json({ u: [{ Cked_Out: m, Out_D: date }] });
                  }
                }
              );
            }
          }
        );
      } else {
        let t = Number(x);
        let m = t.toFixed(5);
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "ID  '" + m + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post5", function (req, res) {
  let obj = req.body;
  let x = obj.clientName;
  pool.query(
    "SELECT clientName FROM store.jobBook WHERE clientName = '" + x + "'",
    function (error, results) {
      if (error) {
        return res.json({ e: error });
      } else if (!error && results.length) {
        pool.query(
          "SELECT jobNum, clientName FROM store.jobBook WHERE clientName = '" +
            x +
            "'",
          function (error, results) {
            if (error) {
              return res.json({ e: error });
            } else if (!error && results.length) {
              let resul = [];
              let w = results.length;
              for (let op = 0; op < w; op++) {
                resul.push({
                  jobNum: results[op].jobNum,
                  clientName: results[op].clientName,
                });
              }
              return res.json({ u: resul });
            }
          }
        );
      } else {
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "clientName  '" + x + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post6", function (req, res) {
  let obj = req.body;
  let x = obj.insertJob;
  let y = obj.sumc;
  if (y === "Cecked Out") {
    pool.query(
      "SELECT * FROM store." + x + " WHERE Cked_Out = 0",
      function (error, results) {
        if (error) {
          return res.json({ e: error });
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
          return res.json({ u: resul });
        } else if (!error && !results.length) {
          return res.json({
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
          return res.json({ e: error });
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
          return res.json({ u: resul });
        } else if (!error && !results.length) {
          return res.json({
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
          return res.json({ e: error });
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
          return res.json({ u: resul });
        } else if (!error && !results.length) {
          return res.json({
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

app.post("/post7", function (req, res) {
  let obj = req.body;
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
        return res.json({ e: error });
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
        return res.json({ u: resul });
      } else {
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "details  '" + x + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post8", function (req, res) {
  let obj = req.body;
  let x = obj.clientName;
  let h = obj.cont;
  pool.query(
    "SELECT jobNum, clientName FROM store.jobBook WHERE clientName = '" +
      x +
      "'",
    function (error, results) {
      if (error) {
        return res.json({ e: error });
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
            return res.json({ e: error });
          } else if (!error && results.length) {
            let k = Object.keys(results[0]);
            let resul = [];
            if (
              k.includes(
                "ID",
                "jobNum",
                "clientName",
                "entryDesc",
                "entryDate",
                "entryContainer",
                "Cked_Out",
                "checkedOutDate",
                "posiPosition",
                "posiWeight"
              )
            ) {
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
              return res.json({ u: resul });
            } else {
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
              return res.json({ u: resul });
            }
          }
        });
      } else {
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "clientName  '" + x + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post9", function (req, res) {
  let obj = req.body;
  let x = obj.delJob;
  pool.query(
    "DROP TABLE store." + x + "",
    function (error, results) {
      if (error) {
        return res.json({ e: error });
      } else if (!error && results) {
        pool.query("DELETE FROM store.posiInfo WHERE jobNum=  " + x + "", function (error, results) {
          if (error) {
            return res.json({ e: error });
          } else if (!error && results) {
            pool.query(
              "DELETE FROM store.jobBook WHERE jobNum= " + x + "",
              function (error, results) {
                if (error) {
                  return res.json({ e: error });
                } else if (!error && results) {
                  let t = Number(x);
                  let m = t.toFixed(5);
                  return res.json({ u: [{ Updated: x }] });
                }
              }
            );
          }
        });
      } else if (!error && !results) {
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "Job_Num  '" + x + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/post10", function (req, res) {
  let obj = req.body;
  let x = obj.delClientName;
  pool.query(
    "SELECT * FROM store.jobBook WHERE clientName=  '" + x + "'",
    function (error, results) {
      if (error) {
        return res.json({ e: error });
      } else if (!error && results.length) {
        let w = results.length;
        for (let op = 0; op < w; op++) {
          pool.query(
            " DROP TABLE store." +
              results[op].jobNum +
              "; DELETE FROM store.posiInfo WHERE jobNum=  '" +
              results[op].jobNum +
              "'",
            function (error, results, fields) {
              if (error) {
                return res.json({ e: error });
              } else if (!error && results) {
                pool.query(
                  "DELETE FROM store.jobBook WHERE clientName=  '" + x + "'",
                  function (error, results, fields) {
                    if (error) {
                      return res.json({ e: error });
                    } else if (!error && results) {
                      console.log(results);
                      let t = Number(x);
                      let m = t.toFixed(5);
                      return res.json({ u: [{ Updated: x }] });
                    }
                  }
                );
              }
            }
          );
        }
      } else if (!error && !results.length) {
        return res.json({
          e: {
            code: " IS_NOT_VALID",
            sqlMessage: "client_Name  '" + x + "' doesn't exist",
          },
        });
      }
    }
  );
});

app.post("/loc", function (req, res) {
  let loc = fs.readFileSync("/home/ubuntu/files/positions/positions.json");
  let loc1 = JSON.parse(loc);

  let f = req.body.posi.toUpperCase();

  let c = loc1.positions.filter((match) => match.includes(f));
  let g = [];
  g.push(f);
  if (c[0] === g[0]) {
    res.json({ posi: g[0] });
  } else {
    res.json({ posi: false });
  }
});

app.get("/loc", function (req, res) {
  let loc = fs.readFileSync("/home/ubuntu/files/positions/positions.json");
  let loc1 = JSON.parse(loc);
  res.json({ loc1 });
});
