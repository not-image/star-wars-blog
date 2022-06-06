const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      //BASE_URL: "https://www.swapi.tech/api",
      BASE_URL: "http://127.0.0.1:8000",
      endPoints: ["characters", "planets"],
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      user: {
        username: JSON.parse(localStorage.getItem("userName")) || "",
        token: JSON.parse(localStorage.getItem("userToken")) || "",
        planet: JSON.parse(localStorage.getItem("userPlanet")) || "",
      },
      loadingScreen: false,
      loginModal: false,
      signupStatus: "",
      loginSatus: "",
      currentTab: "login",
    },
    actions: {
      fetchData: async () => {
        let store = getStore();
        let actions = getActions();
        if (!store.characters.length) {
          setStore({
            ...store,
            loadingScreen: true,
          });
          for (let endPoint of store.endPoints) {
            try {
              let response = await fetch(`${store.BASE_URL}/${endPoint}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.user.token}`,
                },
              });

              if (response.ok) {
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
                  if (each.id === 20) {
                    actions.setLoadingScreen(false);
                  }
                });
              }
            } catch (error) {
              console.log("err", error);
            }
          }
        }
      },
      setLoadingScreen: (status) => {
        let store = getStore();

        setStore({
          ...store,
          loadingScreen: status,
        });
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
      toggleFavorites: async (item, type) => {
        let store = getStore();

        if (store.user.token === "") {
          if (store.favorites.length) {
            let exists = store.favorites.find((eachObj) => {
              return eachObj.id === item.id;
            });
            if (!exists) {
              setStore({
                ...store,
                favorites: [
                  ...store.favorites,
                  {
                    id: item.id,
                    uid: item.uid,
                    name: item.name,
                    type: type,
                  },
                ],
              });
              localStorage.setItem(
                "favorites",
                JSON.stringify(store.favorites)
              );
            } else {
              setStore({
                ...store,
                favorites: store.favorites.filter((eachObj) => {
                  return eachObj.id != item.id;
                }),
              });
              localStorage.setItem(
                "favorites",
                JSON.stringify(store.favorites)
              );
            }
          } else {
            setStore({
              ...store,
              favorites: [
                ...store.favorites,
                {
                  id: item.id,
                  uid: item.uid,
                  name: item.name,
                  type: type,
                },
              ],
            });
            localStorage.setItem("favorites", JSON.stringify(store.favorites));
          }
        } else {
          // if user is logged in
          if (store.favorites.length) {
            let exists = store.favorites.find((eachObj) => {
              return eachObj.id === item.id;
            });
            if (!exists) {
              let response = await fetch(`${store.BASE_URL}/favorites`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.user.token}`,
                },
                body: JSON.stringify({
                  item_id: item.id,
                }),
              });
              if (response.ok) {
                setStore({
                  ...store,
                  favorites: [
                    ...store.favorites,
                    {
                      id: item.id,
                      uid: item.uid,
                      name: item.name,
                      type: type,
                    },
                  ],
                });
                localStorage.setItem(
                  "favorites",
                  JSON.stringify(store.favorites)
                );
              } else {
                console.log("err");
              }
            } else {
              let response2 = await fetch(`${store.BASE_URL}/favorites`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.user.token}`,
                },
                body: JSON.stringify({
                  item_id: item.id,
                }),
              });
              if (response2.status === 204) {
                setStore({
                  ...store,
                  favorites: store.favorites.filter((eachObj) => {
                    return eachObj.id != item.id;
                  }),
                });
                localStorage.setItem(
                  "favorites",
                  JSON.stringify(store.favorites)
                );
              }
            }
          } else {
            let response3 = await fetch(`${store.BASE_URL}/favorites`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.user.token}`,
              },
              body: JSON.stringify({
                item_id: item.id,
              }),
            });
            if (response3.ok) {
              setStore({
                ...store,
                favorites: [
                  ...store.favorites,
                  {
                    id: item.id,
                    uid: item.uid,
                    name: item.name,
                    type: type,
                  },
                ],
              });
              localStorage.setItem(
                "favorites",
                JSON.stringify(store.favorites)
              );
            }
          }
        }
      },
      deleteFromList: async (id) => {
        let store = getStore();

        if (store.user.token === "") {
          setStore({
            ...store,
            favorites: store.favorites.filter((eachObj) => {
              return eachObj.id != id;
            }),
          });
          localStorage.setItem("favorites", JSON.stringify(store.favorites));
        } else {
          let response = await fetch(`${store.BASE_URL}/favorites`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.user.token}`,
            },
            body: JSON.stringify({
              item_id: id,
            }),
          });
          if (response.status === 204) {
            setStore({
              ...store,
              favorites: store.favorites.filter((eachObj) => {
                return eachObj.id != id;
              }),
            });
            localStorage.setItem("favorites", JSON.stringify(store.favorites));
          } else {
            console.log(response.status, "error");
          }
        }
      },
      login: async (email, password) => {
        let store = getStore();

        let response = await fetch(`${store.BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (response.status === 200) {
          let data = await response.json();
          setStore({
            ...store,
            loginStatus: "Signing you in...",
            user: {
              ...store.user,
              username: data.response["username"],
              token: data.response["token"],
              planet: data.response["planet"],
            },
          });
          localStorage.setItem(
            "userName",
            JSON.stringify(data.response["username"])
          );
          localStorage.setItem(
            "userToken",
            JSON.stringify(data.response["token"])
          );
          localStorage.setItem(
            "userPlanet",
            JSON.stringify(data.response["planet"])
          );
          let response2 = await fetch(`${store.BASE_URL}/favorites`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.user.token}`,
            },
          });
          if (response2.ok) {
            let data2 = await response2.json();

            for (let favorite of store.favorites) {
              let reply = await fetch(`${store.BASE_URL}/favorites`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.user.token}`,
                },
                body: JSON.stringify({
                  item_id: favorite.id,
                }),
              });
              if (!reply.ok) {
                console.log("err");
              }
            }
            let dataArr = data2.results.map((eachObj) => {
              return {
                id: eachObj.id,
                uid: eachObj.uid,
                name: eachObj.name,
                type: eachObj.type,
              };
            });
            let joinedFavorites = [
              ...store.favorites.filter((eachObj) => {
                return !dataArr.find((obj) => eachObj.id === obj.id);
              }),
              ...dataArr,
            ];
            setStore({
              ...store,
              favorites: joinedFavorites,
            });
            localStorage.setItem("favorites", JSON.stringify(joinedFavorites));
          }

          // let response3 = await fetch(`${store.BASE_URL}/favorites`, {
          //   method: "GET",
          //   headers: {
          //     Authorization: `Bearer ${store.user.token}`,
          //   },
          // });
          // if (response3.ok) {
          //   let data3 = await response2.json();

          //   let retreivedFavorites = data3.results.map((eachObj) => {
          //     return {
          //       id: eachObj.id,
          //       uid: eachObj.uid,
          //       name: eachObj.name,
          //       type: eachObj.type,
          //     };
          //   });
          //   setStore({
          //     ...store,
          //     favorites: retreivedFavorites,
          //   });
          //   localStorage.setItem(
          //     "favorites",
          //     JSON.stringify(retreivedFavorites)
          //   );
          // }
        } else {
          setStore({
            ...store,
            loginStatus: `We encountered an error ${response.status}.`,
          });
        }
      },
      signup: async (username, email, password, planet) => {
        let store = getStore();
        let actions = getActions();

        let response = await fetch(`${store.BASE_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            planet: planet,
          }),
        });
        if (response.status === 201) {
          setStore({
            ...store,
            signupStatus: "Account created. Signing you in...",
          });
          actions.login(email, password);
        } else {
          setStore({
            ...store,
            signupStatus: `We encountered an error ${response.status}.`,
          });
        }
      },
      logout: () => {
        let store = getStore();

        setStore({
          ...store,
          favorites: [],
          user: {
            username: "",
            token: "",
            planet: "",
          },
          loginStatus: "",
          signupStatus: "",
        });
        localStorage.removeItem("favorites");
        localStorage.removeItem("userName");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userPlanet");
      },
      setLoginModal: (status) => {
        let store = getStore();

        setStore({
          ...store,
          loginModal: status,
        });
      },
      setCurrentTab: (mode) => {
        let store = getStore();

        setStore({
          ...store,
          currentTab: mode,
        });
      },
    },
  };
};

export default getState;
