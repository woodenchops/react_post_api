import React, { Component, createContext } from 'react';

export const TileContext = createContext();

export class TileProvider extends Component {
    state = {
        tileShowCount: 1,
        loading: true,
        tiles: [],
        handleDropDown: (id) => {
                
        this.setState(prevState => ({
                tiles: prevState.tiles.map((tile, i) => ({
                    ...tile,
                    isActive: ( id === i ) ? !this.state.tiles[id].isActive : false
                }))
            }));
                   
        },

        handleDropDownKeyPress: (id, e) => {

            if(e.key === 'Enter'){
                
                this.setState(prevState => ({
                    tiles: prevState.tiles.map((tile, i) => ({
                      ...tile,
                      isActive: ( id === i ) ? !this.state.tiles[id].isActive : false
                    }))
                  }));

            }

        },

        fetchData: async (url) => {
            let res = await fetch(url)
            let data = await res.json();

            return data
        },

        loadTiles: () => {

            this.state.fetchData(`http://localhost:5000/api/posts?page=${this.state.tileShowCount}`)
                .then((res) => {
                    this.setState( prevState => {
                            return {
                                tiles: [...prevState.tiles, ...res],
                                loading: false,
                                tileShowCount: prevState.tileShowCount += 1
                            }
                        });
                        console.log('tiles:', this.state.tiles);
                    })
                .catch((err) => {console.log(err);})
          
        }
     }

     componentDidMount() {
        this.state.loadTiles();
     }

      /**********************
       NOTES:

       tiles: prevState.tiles.map((tile, i) => ({
            ...tile,
            isActive: ( id === i ) ? !this.state.tiles[id].isActive : false
          }))

          The purpose of the above function is to map through each item in an array and create a new object literal for each.
          This then updates the state in the component. 

          So, in this case, the fat arrow function is creating a new object literal.
          In order to create an object literal, we have to wrap the "{}" in parentheses "()" e.g.

          let myFunction = () => ({})

          if you dont wrap the curly braces in parentheses. then you create a regular code block e.g.

          let myFunction = () => { // Do stuff }

           - you cant create an object literal with a regular code block 

           let myFunction = () => { 'title': 'title one' } - this will throw an error


           ------ SPREAD OPERATOR ------

            var obj1 = {a: 100, b: 200}
            var obj2 = {...obj1, b 500}

            NOTE:

            this is the same as 

            var obj2 = {a: 100, b: 200, b: 500} - declared 'b' twice - then then override 'b'

            OUTPUT: obj2 = {a: 100, b: 500}

            You use the spread operator and insert the values from obj1
            You then by targeting 'b' again, you then override the value  


            so, for the above function that we're looking at - we copy over the contents of each object in the original array
            e.g. title, body, isActive - we then override 'isActive' with the new value. We can do this by using a shorthand "if" statement e.g.

             isActive: ( id === i ) ? !this.state.tiles[id].isActive : false

             this is checking if the id of the element clicked matches the index value of the item in the array. If so, then set its 'isActive' property to true.
             else, set it to false


       **********************/

    render() { 
        return ( 
            <TileContext.Provider value={{...this.state}}>
                {this.props.children}
            </TileContext.Provider>
         );
    }
}
 
