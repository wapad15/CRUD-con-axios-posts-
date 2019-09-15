import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import  Swal  from 'sweetalert2';
import Header from './Header'
import Navegacion from './Navegacion'
import Posts from './Posts'
import SinglePost from './SinglePost'
import Formulario from './Formulario';
import Editar from './Editar';




class Router extends Component {
  state = { 
    posts: [],
  }


  componentDidMount() {
    this.obtenerPost();
  }

  obtenerPost() {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    axios.get(url)
      .then(posts => { 
        this.setState({
          posts: posts.data,
        })
      })
  }

  borrarPost = (id) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`
    axios.delete(url)
      .then(respuesta => {
        if (respuesta.status === 200) {
          const posts = [...this.state.posts];

          let resultado = posts.filter(post => (
            post.id !== id
          ));

          this.setState({
            posts: resultado,
          })
      }
    })
  }

  crearPost = (post) => {
    const url = `https://jsonplaceholder.typicode.com/posts`
    axios.post(url, { post })
      .then(respuesta => {
        if (respuesta.status === 201) {
          Swal.fire(
            'Post Creado',
            'Se creo Correctamente!',
            'success'
          )
          const postId = { id: respuesta.data.id }
          const nuevoPost = Object.assign({}, respuesta.data.post, postId)
           console.log(nuevoPost)
          this.setState(prevState => ({
            posts: [...prevState.posts, nuevoPost]
          }))
        }
    })
  }

  editarPost = (postActualizado) => {

    const { id } = postActualizado;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`

    axios.put(url, { postActualizado })
      .then(respuesta => {
        if (respuesta.status === 200) {

          Swal.fire(
            'Post Actualizado',
            'Se guardo Correctamente!',
            'success'
          )
          let postId = respuesta.data.id;
          const posts = [...this.state.posts];
          const indexPostEditar = posts.findIndex(post => postId === post.id);

          posts[indexPostEditar] = postActualizado;

          this.setState({
            posts
          })
        }
    })
  }
  render() { 
    return ( 
      <BrowserRouter>
        <div className="container">
          <div className="row justify-content-center">
            <Header/>
            <Navegacion />
            <Switch>
              <Route exact path={"/"} render={() => {
                return (
                  <Posts
                    posts={this.state.posts}
                    borrarPost = {this.borrarPost}
                  />
                )
              }} />
              <Route exact path={"/post/:postId"} render={(props) => {
                let idPost = props.location.pathname.replace('/post/', '');
                const posts = this.state.posts;
                let filtro;
                filtro = posts.filter(post => (
                  post.id === Number(idPost)
                  
                ));
                return (
                  <SinglePost
                    post= {filtro[0]}
                  />
                )
              }} />
              
              <Route exact path={"/crear"} render={() => {
                return (
                  <Formulario
                    crearPost={this.crearPost}
                    
                  />
                )
              }} />
              
              <Route exact path={"/Editar/:postId"} render={(props) => {
                let idPost = props.location.pathname.replace('/editar/', '');
                const posts = this.state.posts;
                let filtro;
                filtro = posts.filter(post => (
                  post.id === Number(idPost)
                  
                ));
                return (
                  <Editar
                    post={filtro[0]}
                    editarPost={this.editarPost}
                  />
                )
              }} />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
     );
  }
}
 
export default Router;