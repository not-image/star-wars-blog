const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      //BASE_URL: "https://www.swapi.tech/api",
      BASE_URL: "127.0.0.1:8000",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MjQ2NDU3MCwianRpIjoiMWYwMjIzN2EtMDcyYi00YjY2LTkwOGYtYTE4MDJkMWE5NzhlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjUyNDY0NTcwLCJleHAiOjE2NTI0NjU0NzB9.YwqolmSPZ1C-K8Dp96M4w7N69FnTzu-GVRqSnwNQAcU",
      endPoints: ["people", "planets"],
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      isLoading: false,
    },
    actions: {
      fetchData: async () => {
        let store = getStore();
        if (!store.characters.length) {
          setStore({
            ...store,
            isLoading: true,
          });
          for (let endPoint of store.endPoints) {
            try {
              let response = await fetch(`${store.BASE_URL}/${endPoint}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.token}`,
                },
              });

              if (response.ok) {
                console.log("response ok")
                let data = await response.json();
                data.results.map(async (each) => {
                  setStore({
                    ...store,
                    [endPoint]: [...store[endPoint], each],
                  });
                  localStorage.setItem(
                    endPoint,
                    JSON.stringify(store[endPoint])
                  );
                  if (
                    endPoint === "planets" &&
                    itemData.results.uid === "10"
                  ) {
                    setStore({
                      ...store,
                      isLoading: false,
                    });
                  }
                });
              }
            } catch (error) {
              console.log("err", error);
            }
          }
        }
      },
      // getApiData: async () => {
      //   let store = getStore();
      //   if (!store.people.length) {
      //     setStore({
      //       ...store,
      //       isLoading: true,
      //     });
      //     for (let endPoint of store.endPoints) {
      //       try {
      //         let response = await fetch(`${store.BASE_URL}/${endPoint}`);
      //         if (response.ok) {
      //           let data = await response.json();
      //           data.results.map(async (each) => {
      //             let answer = await fetch(
      //               `${store.BASE_URL}/${endPoint}/${each.item_id}`
      //             );
      //             if (answer.ok) {
      //               let itemData = await answer.json();
      //               setStore({
      //                 ...store,
      //                 [endPoint]: [...store[endPoint], itemData.result],
      //               });
      //               localStorage.setItem(
      //                 endPoint,
      //                 JSON.stringify(store[endPoint])
      //               );
      //               if (
      //                 endPoint === "planets" &&
      //                 itemData.result.item_id === "10"
      //               ) {
      //                 setStore({
      //                   ...store,
      //                   isLoading: false,
      //                 });
      //               }
      //             }
      //           });
      //         }
      //       } catch (err) {
      //         console.log(JSON.stringify(err));
      //       }
      //     }
      //   } else {
      //   }
      // },
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
                  id: item.item_id,
                  uid: item.uid,
                  name: item.name,
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
