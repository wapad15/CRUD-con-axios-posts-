import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

class Post extends Component {

  confirmarEliminacion = () => {
    
    const { id } = this.props.info;

    Swal.fire({
      title: '¿estas seguro?',
      text: "Esta accion  no se puede seshacer!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: "Cancelar",
        
    }).then((result) => {
        if (result.value) {
          this.props.borrarPost(id);
          Swal.fire(
            'Eliminado!',
            'El post ha sido eliminado.',
            'success'
          )
        }
      })
  }

  render() { 

    const { id, title } = this.props.info;
    return ( 
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Link to={`/post/${id}`} className="btn btn-primary">Ver</Link>
          <Link to={`/editar/${id}`} className="btn btn-warning">Editar</Link>
          <button onClick={this.confirmarEliminacion}
            type="button"  className="btn btn-danger">Borrar</button>
          
        </td>
      </tr>
      
     );
  }
}
 
export default Post;