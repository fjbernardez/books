import React from 'react';

import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      books:[
        {id:0, rating: 4, title: 'Harry Potter y el cáliz de fuego', image: 'harryPotter.jpg'},
        {id:1, rating: 3, title: 'The shining', image: 'theShining.jpg'},
        {id:2, rating: 5, title: 'Código Da Vinci', image: 'codigoDaVinci.jpg'},
        {id:3, rating: 5, title: 'El principito', image: 'elPrincipito.jpg'},
        {id:4, rating: 5, title: 'Sobrenatural', image: 'sobreNatural.jpg'}
      ],
      copyBooks: []
    };

    this.onAdd = this.onAdd.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onUpdateRating = this.onUpdateRating.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount(){
    this.initBooks();
  }

  initBooks = () => {
    this.setState((state, props) => ({
      // copyBooks como una copia de state.books
      copyBooks: [... state.books]
    }));
  }

  onAdd(item) {
    // copio el array
    let temp = [... this.state.books];
    // calculo proximo id
    const id = temp[temp.length-1].id + 1;
    // seteo el valor
    item['id'] = id;
    // añado al array
    temp.push(item);

    //actualizo
    this.setState({books: [... temp]});
    this.initBooks();
  }

  onSearch(query) {
    if (query == '') {
      this.initBooks();
    } else {
      const temp = [... this.state.books];
      var res = [];

      temp.forEach(item => {
        if(item.title.toLowerCase().indexOf(query) > -1) {
          res.push(item)
        }
      });

      //actualizo
      this.setState({copyBooks: [... res]});
    }
  }

  onUpdateRating(item) {
    var temp = [... this.state.books];
    const index = temp.findIndex(x => x.id == item.id);

    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [... temp]});
    this.initBooks();
  }

  onRemove(id) {
    var temp = [... this.state.books];
    const res = temp.filter(item => item.id != id);

    this.setState({books: [... res]});
    this.initBooks();
  }

  render() {
    return (
      <div className="app">
        <Menu title="Amozon" onAdd={this.onAdd} onSearch={this.onSearch}/>
        <List items={this.state.copyBooks} onUpdateRating={this.onUpdateRating} onRemove={this.onRemove}/>
      </div>
    );
  }

}

export default App;
