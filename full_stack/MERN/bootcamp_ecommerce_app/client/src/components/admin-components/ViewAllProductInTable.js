import {Container, Row, Col, Table, Button} from 'react-bootstrap';

import {useEffect, useState, useMemo} from 'react';

import {useTable, useSortBy, useGlobalFilter} from 'react-table';

import AddProduct from './AddProduct.js';
import FilterTable from './FilterTable.js';

export default function ViewProductInTable(){

	const [products, setProducts] = useState([])

	const getAllProducts = () => {
		if(localStorage.getItem('token')){
			fetch(
				`${process.env.REACT_APP_API_URL}/products`,
				{
					method: 'GET',
					headers:{
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				}
			)
			.then(response => response.json())
			.then(data => {
				if(data){
					const products = data
					setProducts(products);
				}
			})
		}
	}
	
	useEffect(() => {
		getAllProducts();
	},[])


	// custom table headers
	// const customColumns = useMemo(
	//   () => [
	//     {
	//       Header: "Product Name",
	//       accessor: "productName",
	//     },
	//     {
	//       Header: "Description",
	//       accessor: "description",
	//     },

	//     {
	//       Header: "Price",
	//       accessor: "price",
	//     },
	//     {
	//       Header: "Quantity",
	//       accessor: "quantity",
	//     }
	//   ],
	//   []
	// );

	const productData = useMemo(() => [...products], [products])

	// dynamic table headers as as what is in the database
	const productColumns = useMemo(() => 
		products[0] ?
			Object.keys(products[0])
				.filter((key) => key !==  "_id" && key !==  "__v" && key !== "createdOn")
				.map((key) => {
						if(key === 'isActive'){
							return{
								Header: key,
								accessor: key,
								Cell: ({value})=> value === true ? 'Active' : 'Archived'
							}
						}
						return {Header: key, accessor: key};
					}
				)
		: [],
		[products]
	);

	const tableHooks = (hooks) => {
	  hooks.visibleColumns.push((columns) => [
	    ...columns,
	    {
	      id: "Action",
	      Header: "Action",
	      Cell: ({ row }) => (
	        <div className="d-flex justify-content-evenly">	
		        <Button variant="warning" onClick={() => alert(row.values.price)}>
					Update
		        </Button>
	        	<Button variant="secondary" onClick={() => alert(row.values.price)}>
					Archive
	        	</Button>
	        </div>
	      ),
	    },
	  ]);
	};

	const tableInstance = useTable(
		{columns: productColumns, data: productData},
		useGlobalFilter,
		tableHooks,
		useSortBy
	);

	const {
	  getTableProps,
	  getTableBodyProps,
	  headerGroups,
	  rows,
	  prepareRow,
	  preGlobalFilteredRows,
	  setGlobalFilter,
	  state
	} = tableInstance;

	return(
		<Container>
			<Row>
				<Col className="col-12">
					<h1 className="">Products</h1>
				</Col>

				<Col className="col-12 col-md-5 ms-0">
					<FilterTable
						preGlobalFilteredRows={preGlobalFilteredRows}
	        			setGlobalFilter={setGlobalFilter}
	        			globalFilter={state.globalFilter}
        			/>
				</Col>

				<Col className="col-12 col-md-3 ms-md-auto">
						<div className="d-flex justify-content-end py-1">
							<AddProduct/>
						</div>
				</Col>

				<Col className="col-12">
					<div className="table-responsive">
						<Table {...getTableProps()} striped bordered hover className='table'>
							<thead>
							    {
							    	headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{
												headerGroup.headers.map((column) => (
													<th {...column.getHeaderProps(column.getSortByToggleProps())}>
														{column.render("Header")}
														{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
													</th>
												))
											}
										</tr>
									))
							    }
							</thead>
							<tbody {...getTableBodyProps()}>
								{
									rows.map((row) => {
										prepareRow(row);
										return (
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => (
													<td {...cell.getCellProps()}> {cell.render("Cell")}</td>
												))}
											</tr>
										);
									})
								}
							</tbody>
						</Table>
					</div>
					
				</Col>
			</Row>
		</Container>
	)
}