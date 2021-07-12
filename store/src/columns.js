import textFilter from "react-bootstrap-table2-filter";

const columns1 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "Client",
    text: "Client",
  },
  {
    dataField: "In_D",
    text: "In_D",
  },
];

const columns2 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "ID",
    text: "ID",
  },
  {
    dataField: "Details",
    text: "Details",
  },
  {
    dataField: "In_D",
    text: "In_D",
  },
  {
    dataField: "Container",
    text: "Container",
  },
];

const columns3 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "ID",
    text: "ID",
  },
  {
    dataField: "Position",
    text: "Position",
  },
  {
    dataField: "Weight",
    text: "Weight",
  },
];

const columns4 = [
  {
    dataField: "Cked_Out",
    text: "Cked_Out",
  },
  {
    dataField: "Out_D",
    text: "Out_D",
  },
];

const columns5 = [
  {
    dataField: "jobNum",
    text: "Job#",
  },
  {
    dataField: "clientName",
    text: "Client",
  },
];

const columns6 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    filter: textFilter({ placeholder: "Find Details" }),
    headerStyle: {
      width: "auto",
      overflow: "hidden",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    hidden: true,
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "checkedOutDate",
    text: "Out_D",
    hidden: true,
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns7 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    headerStyle: {
      width: "auto",
      overflow: "hidden",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    sort: true,
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns8 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    headerStyle: {
      width: "auto",
      overflow: "auto",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns9 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
];
const columns10 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
];

const columns11 = [
  {
    dataField: "jobNum",
    text: "Job#",
    sort: true,
  },
  {
    dataField: "clientName",
    text: "Client",
    sort: true,
  },
];

const columns12 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
  },
  {
    dataField: "jobNum",
    text: "Job#",
    sort: true,
  },
  {
    dataField: "clientName",
    text: "Client",
    sort: true,
  },
];

const columns13 = [
  {
    dataField: "Positions",
    text: "All Positions",
  },
];

const columns14 = [
  {
    dataField: "Positions",
    text: "Free Positions",
  },
];

const columns15 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
  },
  {
    dataField: "jobNum",
    text: "Job#",
    sort: true,
  },
  {
    dataField: "clientName",
    text: "Client",
    sort: true,
  },
];
const column = {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  columns10,
  columns11,
  columns12,
  columns13,
  columns14,
  columns15,
};
export default column;
