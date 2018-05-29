import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import './App.css';


class App extends Component {

  state={
    recipes:[],
    showAdd:false,
    showEdit:false,
    currentIndex:0,
    newestRecipe:{recName:'',ingredience:[]}
  }

  deleteRec(index){
    let recipes =this.state.recipes.slice();
    recipes.splice(index,1);
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
  }
  updateNewRecipe(recName,ingredience){
    this.setState({newestRecipe:{recName:recName,ingredience:ingredience}});
    
  }
  

  saveRecipe(){
    let recipes= this.state.recipes.slice();
    recipes.push({recName:this.state.newestRecipe.recName,ingredience:this.state.newestRecipe.ingredience});
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
     this.setState({newestRecipe:{recName:'',ingredience:[]}});
         this.close();
  }
  editRecipe(){

  }
  updateName(recName,currentIndex){
    let recipes= this.state.recipes.slice();
    recipes[currentIndex]={recName:recName,ingredience:recipes[currentIndex].ingredience};
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
}
updateIngredience(ingredience,currentIndex){
    let recipes= this.state.recipes.slice();
    recipes[currentIndex]={recName:recipes[currentIndex].recName,ingredience:ingredience};
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
  }
  open=(state,currentIndex)=>{
    this.setState({[state]: true});
    this.setState({currentIndex});
  }

  close=()=>{
    if(this.state.showAdd){
      this.setState({showAdd:false});
    }else if(this.state.showEdit){
      this.setState({showEdit:false});
    }
  }

  componentDidMount(){
    let recipes=JSON.parse(localStorage.getItem('recipes'))||[];
    localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});

  }

  render() {
    const {recipes, newestRecipe, currentIndex}=this.state;
    return (
      <div className="App container">
            {recipes.length>0 &&(
            <div>
              <div className='main'>
                {recipes.map((recipe,index)=>(
                  <Panel>
                    <Panel.Heading eventkey={index} key={index}>{recipe.recName}</Panel.Heading> 
                    <div className='panel-container'>
                      <p>Ingredience:</p>
                      <ol>{recipe.ingredience.map((item)=>(
                        <li key={item}>
                        {item}
                        </li>
                        ))}
                      </ol>
                      <div>
                       <Button className='buttons' bsStyle='danger' onClick={(event)=>this.deleteRec(index)}>Delete</Button>
                       <Button className='buttons' bsStyle='success' onClick={(event)=>this.open('showEdit',currentIndex)}>Edit</Button>
                      </div>
                    </div>
                  </Panel>
              ))}
              </div>
              <Modal show={this.state.showEdit} onHide={this.close}>
                <Modal.Header closeButton>
                <Modal.Title>Add Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <FormGroup controlId='formBasicText'>
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl
                        type='text'
                        value={recipes[currentIndex].recName}
                        placeholder='Enter Recipe Name'
                        onChange={(event)=>this.updateName(event.target.value,currentIndex)}
                    ></FormControl>
                  </FormGroup>
                    <FormGroup controlId='formControlsTextarea'>
                    <ControlLabel>Ingredience</ControlLabel>
                    <FormControl
                        type='textarea'
                        value={recipes[currentIndex].ingredience}
                        placeholder='Enter Ingredience'
                        onChange={(event)=>this.updateIngredience(event.target.value.split(','),currentIndex)}
                    ></FormControl>
                    </FormGroup>
              </Modal.Body>   
              <Modal.Footer>
                  <Button bsStyle='primary' onClick={this.close}>Edit</Button>
              </Modal.Footer>
        </Modal>
        </div>
            )}
          

        
            
        <Modal show={this.state.showAdd} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId='formBasicText'>
                <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                      type='text'
                      value={newestRecipe.recName}
                      placeholder='Enter Recipe Name'
                      onChange={(event)=>this.updateNewRecipe(event.target.value,newestRecipe.ingredience)}
                  ></FormControl>
              </FormGroup>
              <FormGroup controlId='formControlsTextarea'>
                <ControlLabel>Ingredience</ControlLabel>
                <FormControl
                      type='textarea'
                      value={newestRecipe.ingredience}
                      placeholder='Enter Ingredience'
                      onChange={(event)=>this.updateNewRecipe(newestRecipe.recName,event.target.value.split(','))}
                ></FormControl>
             </FormGroup>
            </Modal.Body>   
              <Modal.Footer>
                <Button bsStyle='primary' onClick={(event)=>this.saveRecipe()}>Save</Button>
              </Modal.Footer>
         </Modal>
        <Button bsStyle='primary' onClick={(event)=>this.open('showAdd',currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
