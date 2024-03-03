export const userColumns = [
  { field: "_id", headerName: "ID", width: 120 },
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },

  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
  }
  
];


export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "type",
    headerName: "Type",
    width: 100,
  },

  {
    field: "title",
    headerName: "Title",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },

  {
    field: "hotel",
    headerName: "Hotel",
    width: 100
  },

  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
  },

  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },

  
];
