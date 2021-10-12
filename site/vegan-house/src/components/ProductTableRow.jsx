import '../styles/productTableRow.css';

export function ProductTableRow(props) {
    return (
      <>
        <div className="products-table-row">
            <label>{props.product}</label>
            <label>{props.category}</label>
            <label>{props.subcategory}</label>
            <label>{props.stock}</label>

            <div className="products-table-row-buttons">
                <button><i class="fas fa-edit"></i></button>
                <button><i class="fas fa-trash"></i></button>
            </div>
        </div>
      </>
    );
}