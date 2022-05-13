import { CompressOutlined } from "@mui/icons-material";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // BASE_URL: "https://www.swapi.tech/api",
      BASE_URL: "127.0.0.1:3000",
      endPoints: ["characters", "planets"],
      people: JSON.parse(localStorage.getItem("people")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      isLoading: false,
    },
    actions: {
      getApiData: async () => {
        let store = getStore();
        if (!store.people.length) {
          setStore({
            ...store,
            isLoading: true,
          });
          for (let endPoint of store.endPoints) {
            try {
              let response = await fetch(`${store.BASE_URL}/${endPoint}`);
              if (response.ok) {
                let data = await response.json();
                data.results.map(async (each) => {
                  let answer = await fetch(
                    `${store.BASE_URL}/${endPoint}/${each.item_id}`
                  );
                  if (answer.ok) {
                    let itemData = await answer.json();
                    setStore({
                      ...store,
                      [endPoint]: [...store[endPoint], itemData.result],
                    });
                    localStorage.setItem(
                      endPoint,
                      JSON.stringify(store[endPoint])
                    );
                    if (
                      endPoint === "planets" &&
                      itemData.result.item_id === "10"
                    ) {
                      setStore({
                        ...store,
                        isLoading: false,
                      });
                    }
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
