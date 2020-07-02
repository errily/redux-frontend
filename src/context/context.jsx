import React ,{Component , createContext } from "react";


export const RootContext = createContext();
const Provider = RootContext.Provider;

// provider
const GlobalProvider = (Children) =>{
    return (
        class ParentComponent extends Component {

            state = {
                globalcounter : 0
            }

            dispatch = (action) => {

                if (action.type === "ADD_COUNTER") {
                    return this.setState({
                        globalcounter : this.state.globalcounter + 1
                    });
                }
                if (action.type === "SUB_COUNTER") {
                    return this.setState({
                        globalcounter : this.state.globalcounter - 1
                    });
                }
              
            }

            render(){
                return (
                    <Provider value={{
                        state : this.state,
                        dispatch : this.dispatch
                    }}>
                      <Children {...this.props}/>
                    </Provider>
                  
                )
            }
        }
       
    )
}



export default GlobalProvider;

//consumer
const Consumer = RootContext.Consumer;
export const GlobalConsumer = (Children) =>{
    return (
        class ParentComponent extends Component{
            render(){
                return(
                    <Consumer>
                    {
                        value => {
                            return (
                                <Children {...this.props} {...value}/>
                            )
                        }
            
                    }
                    
                </Consumer>
                )
            }
        }
        
    )
}