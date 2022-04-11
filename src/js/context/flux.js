const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      BASE_URL: "https://www.swapi.tech/api",
      endPoints: ["people", "planets", "vehicles"],
      people: JSON.parse(localStorage.getItem("people")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    },
    actions: {
      getApiData: async () => {
        let store = getStore();
        if (!store.people.length) {
          for (let endPoint of store.endPoints) {
            try {
              let response = await fetch(`${store.BASE_URL}/${endPoint}`);
              if (response.ok) {
                let data = await response.json();
                console.log(data);
                data.results.map(async (each) => {
                  let answer = await fetch(
                    `${store.BASE_URL}/${endPoint}/${each.uid}`
                  );
                  if (answer.ok) {
                    let itemData = await answer.json();
                    console.log(itemData);
                    setStore({
                      ...store,
                      [endPoint]: [...store[endPoint], itemData.result],
                    });
                    localStorage.setItem(
                      endPoint,
                      JSON.stringify(store[endPoint])
                    );
                  }
                });
              }
            } catch (err) {
              console.log(err);
            }
          }
        } else {
        }
      },
      toggleFavorites: (item, type) => {
        let store = getStore();
        if (store.favorites.length) {
          let exists = store.favorites.find((eachObj) => {
            return eachObj.id === item._id;
          });
          if (!exists) {
            setStore({
              ...store,
              favorites: [
                ...store.favorites,
                {
                  id: item._id,
                  uid: item.uid,
                  name: item.properties.name,
                  type: type,
                },
              ],
            });
            localStorage.setItem("favorites", JSON.stringify(store.favorites));
          } else {
            setStore({
              ...store,
              favorites: store.favorites.filter((eachObj) => {
                return eachObj.id != item._id;
              }),
            });
            localStorage.setItem("favorites", JSON.stringify(store.favorites));
          }
        } else {
          console.log("favorites array is empty");
          setStore({
            ...store,
            favorites: [
              ...store.favorites,
              {
                id: item._id,
                uid: item.uid,
                name: item.properties.name,
                type: type,
              },
            ],
          });
          localStorage.setItem("favorites", JSON.stringify(store.favorites));
        }

        console.log(store.favorites);
      },
      deleteFromList: (id) => {
        let store = getStore();
        setStore({
          ...store,
          favorites: store.favorites.filter((eachObj) => {
            return eachObj.id != id;
          }),
        });
        localStorage.setItem("favorites", JSON.stringify(store.favorites));
      },
    },
  };
};

export default getState;
