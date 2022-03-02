import '../styles/productTableRow.scss';

function ProductTableRow(props) {
  return (
    <>
      <div className="products-table-row" key={props.id}>
        <label>{props.name}</label>
        <label>{props.category}</label>
        <label>{props.inventory}</label>

        <div className="products-table-row-buttons">
          <button onClick={props.edit}><i id={props.id} class="fas fa-edit"></i></button>
          <button onClick={props.removeModal}><i id={props.id} class="fas fa-trash"></i></button>
        </div>
      </div>
    </>
  )
}

export default ProductTableRow;

