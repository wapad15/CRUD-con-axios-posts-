import React, { Component } from 'react'


class Formulario extends Component {

  tituloRef = React.createRef();
  entradaRef = React.createRef();
  
  crearPost = (e) => {
    e.preventDefault();

    //leer los ref y crear el objeto
    const post = {
      title: this.tituloRef.current.value,
      body: this.entradaRef.current.value,
      userId: 1,
    }

    //mandar  por pros e objeto o  peticiones axios
    this.props.crearPost(post);

    e.currentTarget.reset();
}

  render() { 
    return ( 
      <form onSubmit={this.crearPost} className="col-8">
        <legend className="text-center">Crear Nuevo Post</legend>
        <div className="form-group">
          <label>Titulo del Post:</label>
          <input ref={this.tituloRef} type="text" className="form-control" placeholder="Titulo del Post"/>
        </div>
        <div className="form-group">
          <label>Contenido:</label>
          <textarea ref={this.entradaRef} className="form-control" placeholder="Contenido..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
     );
  }
}
 
export default Formulario;