import React, { Component } from 'react'


class Editar extends Component {

  tituloRef = React.createRef();
  entradaRef = React.createRef();
  
  editarPost = (e) => {
    e.preventDefault();

    //leer los ref y crear el objeto
    const post = {
      title: this.tituloRef.current.value,
      body: this.entradaRef.current.value,
      userId: 1,
      id: this.props.post.id
    }
     
  
    //mandar  por pros e objeto o  peticiones axios
    this.props.editarPost(post);
}

  cargarFormulario = () => {
    if (!this.props.post) return null;
    const { title, body } = this.props.post;
    return (
      <form onSubmit={this.editarPost} className="col-8">
        <legend className="text-center">Editar Post</legend>
        <div className="form-group">
          <label>Titulo del Post:</label>
          <input ref={this.tituloRef} type="text" className="form-control" defaultValue={title}/>
        </div>
        <div className="form-group">
          <label>Contenido:</label>
          <textarea ref={this.entradaRef} className="form-control" defaultValue={body}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    )
  }
  render() { 
    return ( 
      <React.Fragment>
        {this.cargarFormulario()}
      </React.Fragment>
     );
  }
}
 
export default Editar;