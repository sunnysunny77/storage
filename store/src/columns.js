import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const columns1 = [
  {
    dataField: "Updated",
    text: "Updated",
    sort: true,
  },
  {
    dataField: "Client",
    text: "Client",
    sort: true,
  },
  {
    dataField: "In_D",
    text: "In_D",
    sort: true,
  },
];

const columns2 = [
  {
    dataField: "Updated",
    text: "Updated",
    sort: true,
  },
  {
    dataField: "ID",
    text: "ID",
    sort: true,
  },
  {
    dataField: "Details",
    text: "Details",
    sort: true,
  },
  {
    dataField: "In_D",
    text: "In_D",
    sort: true,
  },
  {
    dataField: "Container",
    text: "Container",
    sort: true,
  },
];

const columns3 = [
  {
    dataField: "Updated",
    text: "Updated",
    sort: true,
  },
  {
    dataField: "ID",
    text: "ID",
    sort: true,
  },
  {
    dataField: "Position",
    text: "Position",
    sort: true,
  },
  {
    dataField: "Weight",
    text: "Weight",
    sort: true,
  },
];

const columns4 = [
  {
    dataField: "Cked_Out",
    text: "Cked_Out",
    sort: true,
  },
  {
    dataField: "Out_D",
    text: "Out_D",
    sort: true,
  },
];

const columns5 = [
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
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    hidden: true,
    sort: true,
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
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    sort: true,
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
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    sort: true,
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
    sort: true,
  },
];
const columns10 = [
  {
    dataField: "Updated",
    text: "Updated",
    sort: true,
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
    sort: true,
  },
];

const columns14 = [
  {
    dataField: "Positions",
    text: "Free Positions",
    sort: true,
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
  filterFactory,
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
