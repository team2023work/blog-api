const Host = {
    ROOT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3005" : "https://blog-api-q65b.onrender.com/",
    PREFIX: "/v1/api",
    FRONTEND: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://localhost:3000",
  }
  
  const ApiEndpoints = {  

      Users: {
          route: `${Host.PREFIX}/users`,
          list: `/list`,
          login: `/login`,
          signup: `/signup`,
          forgot: `/forgot`,
          me: `/me`,
          edit: `/edit/:id`,
          reset: `/reset/:id`,
      },

      Admins: {
          route: `${Host.PREFIX}/admins`,
          list: `/list`,
          login: `/login`,
          create: `/create`,
          forgot: `/forgot`,
          me: `/me`,
          edit: `/edit/:id`,
          reset: `/reset/:id`,
      },


      Categories: {
          route: `${Host.PREFIX}/categories`,
          list: `/list`,
          create: `/create`,
          edit: `/edit/:id`,
          delete: `/delete/:id`,
      },

      Tags: {
          route: `${Host.PREFIX}/categories`,
          list: `/list`,
          create: `/create`,
          edit: `/edit/:id`,
          delete: `/delete/:id`,
      },

      Article: {
          route: `${Host.PREFIX}/article`,
          list: `/list`,
          create: `/create`,
          edit: `/edit/:id`,
          signal: `/signal/:id`,
      },

      Comments: {
          route: `${Host.PREFIX}/comments`,
          list: `/list`,
          create: `/create`,
          edit: `/edit/:id`,
          delete: `/delete/:id`,
      },

      Likes: {
          route: `${Host.PREFIX}/likes`,
          list: `/list`,
          create: `/create`,
          delete: `/delete/:id`,
      },

      Media: {
          route: `${Host.PREFIX}/media`,
          view: `/view/:id`,
          create: `/create`,
      },

  
};
  
module.exports = {ApiEndpoints , Host}