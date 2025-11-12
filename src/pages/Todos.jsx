import React, { useState, useEffect } from "react";
import { Button, Form, Table, Badge, Modal } from "react-bootstrap";
import { fetchTodos } from "../data/todos";

const Todos = () => {
    const [todosRaw, setTodosRaw] = useState([]);
    const [todos, setTodos] = useState([]);
    
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [curPage, setCurPage] = useState(1);
    const [numPages, setNumPages] = useState(3);
    const [filteredCount, setFilteredCount] = useState(0);
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        const data = fetchTodos();
        setTodosRaw(data);
        updateNextId(data);
    }, []); // load
    
    // Function to find next available ID
    const updateNextId = (todos) => {
        // Since IDs are now continuous, next ID is just length + 1
        setNextId(todos.length + 1);
    };
    
    // Function to toggle todo status
    const toggleTodoStatus = (id) => {
        setTodosRaw(prev => prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    // Function to delete todo
    const deleteTodo = (id) => {
        setTodosRaw(prev => {
            const newTodos = prev.filter(todo => todo.id !== id);
            // Reindex IDs to be continuous starting from 1
            const reindexedTodos = newTodos.map((todo, index) => ({
                ...todo,
                id: index + 1
            }));
            updateNextId(reindexedTodos);
            return reindexedTodos;
        });
    };
    
    // Function to add new todo
    const addTodo = () => {
        if (newTodoTitle.trim()) {
            const newTodo = {
                userId: 1,
                id: nextId,
                title: newTodoTitle.trim(),
                completed: false
            };
            setTodosRaw(prev => {
                const newTodos = [...prev, newTodo];
                updateNextId(newTodos);
                return newTodos;
            });
            setNewTodoTitle('');
            setShowModal(false);
        }
    };

    useEffect(() => {
        // Filter todos based on onlyWaiting
        let filteredTodos = onlyWaiting ? todosRaw.filter(todo => !todo.completed) : todosRaw;
        
        // Calculate pagination
        const totalItems = filteredTodos.length;
        const calculatedNumPages = totalItems === 0 ? 0 : Math.ceil(totalItems / itemsPerPage);
        setNumPages(calculatedNumPages);
        
        // Reset to page 1 if current page is invalid, or 0 if no items
        if (totalItems === 0) {
            setCurPage(0);
        } else if (curPage > calculatedNumPages || curPage === 0) {
            setCurPage(1);
        }
        
        // Get items for current page
        const startIndex = (curPage - 1) * itemsPerPage;
        const endIndex = startIndex + parseInt(itemsPerPage);
        const paginatedTodos = filteredTodos.slice(startIndex, endIndex);
        
        setTodos(paginatedTodos);
        
        // Store filtered count for display
        setFilteredCount(totalItems);
    }, [todosRaw, onlyWaiting, itemsPerPage, curPage]);
        
    return ( 
    <>
    {/* filter */}
    <div className='d-flex align-items-center justify-content-between'>
        <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label={<>Show only <Badge bg='warning' text='dark'>waiting&nbsp;<i className="bi bi-clock"></i></Badge></>}
        onChange={(e) => setOnlyWaiting(e.target.checked)}
        />
        <Form.Select aria-label="Default select example" className='w-25' onChange={(e) => setItemsPerPage(e.target.value)}>
            <option value={5}>5 items per pages</option>
            <option value={10}>10 items per pages</option>
            <option value={50}>50 items per pages</option>
            <option value={100}>100 items per pages</option>
        </Form.Select>
    </div>
    
    {/* table */}
    <div>
    <Table striped bordered hover>
    <thead className='table-dark'>
        <tr>
        <th className='text-center' style={{ width: '4rem' }}>ID</th>
        <th className='text-center'>Title</th>
        <th className='text-end' style={{ width: '12rem' }}>
            Completed&nbsp;
            <Button 
                variant='primary' 
                size='sm'
                onClick={() => setShowModal(true)}
                title="Add new todo"
            >
                <i className="bi bi-plus"></i>
            </Button>
        </th>
        </tr>
    </thead>
        <tbody>
        {todos.map((todo) => {
        return (
            <tr key={todo.id} style={{height: '2rem'}}>
                <td className='text-center'>{todo.id}</td>
                <td><Badge bg="secondary">{todo.title}</Badge></td>
                <td className='text-end'>
                    {todo.completed ? (
                        <Badge bg='success'>done&nbsp;<i className="bi bi-check"></i></Badge>
                    ) : (
                        <Badge 
                            bg='warning' 
                            text='dark' 
                            style={{cursor: 'pointer'}} 
                            onClick={() => toggleTodoStatus(todo.id)}
                            title="Click to mark as done"
                        >
                            waiting&nbsp;<i className="bi bi-clock"></i>
                        </Badge>
                    )}
                    &nbsp;
                    <Button 
                        variant='danger' 
                        size='sm' 
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete todo"
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </td>
            </tr>
        );
    })}
        </tbody>
    </Table>
    </div>

    {/* pagination */}
    <div className='text-center'>
        <Button variant='outline-primary' onClick={() => setCurPage(1)} disabled={curPage <= 1 || numPages === 0}>First</Button>&nbsp;
        <Button variant='outline-primary' onClick={() => curPage > 1 && setCurPage((p) => p - 1)} disabled={curPage <= 1 || numPages === 0}>Previous</Button>&nbsp;
        <span>{curPage}&nbsp;/&nbsp;{numPages}</span>&nbsp;
        <Button variant='outline-primary' onClick={() => curPage < numPages && setCurPage((p) => p + 1)} disabled={curPage >= numPages || numPages === 0}>Next</Button>&nbsp;
        <Button variant='outline-primary' onClick={() => setCurPage(numPages)} disabled={curPage >= numPages || numPages === 0}>Last</Button>
        
        {/* Items count display */}
        <div className='mt-2 text-muted small'>
            {(() => {
                const currentPageItems = todos.length;
                return `Showing ${currentPageItems} of ${filteredCount} items`;
            })()}
        </div>
    </div>
    

    
    {/* Add Todo Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>
                <Button variant='primary' size='sm' style={{marginRight: '8px', pointerEvents: 'none'}}>
                    <i className="bi bi-plus"></i>
                </Button>
                Add todo
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>ID: <Badge bg="secondary">{nextId}</Badge></Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="typing your todo title here..."
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    autoFocus
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                ✕ Cancel
            </Button>
            <Button variant="primary" onClick={addTodo} disabled={!newTodoTitle.trim()}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
    </> 
    );
}
export default Todos;