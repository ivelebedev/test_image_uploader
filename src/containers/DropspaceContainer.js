import React from 'react';
import Dropspace from '../components/Dropspace';

class DropspaceContainer extends React.Component {
	
	state = {
		drag: false
	}
	
	dropRef = React.createRef();
	inputRef = React.createRef();
	
	handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}
	
	handleDragIn = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(this.state.drag);
		this.dragCounter++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			this.setState({drag: true});
		}
	}
	
	handleDragOut = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(this.state.drag);
		this.dragCounter--;
		if (this.dragCounter === 0) {
			this.setState({drag: false});
		}
	}
	
	handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({drag: false})
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			this.props.handleDrop(e.dataTransfer.files);
			e.dataTransfer.clearData();
			this.dragCounter = 0;
		}
	}
	
	componentDidMount() {
		let div = this.dropRef.current
		div.addEventListener('dragenter', this.handleDragIn);
		div.addEventListener('dragleave', this.handleDragOut);
		div.addEventListener('dragover', this.handleDrag);
		div.addEventListener('drop', this.handleDrop);
	}
	
	componentWillUnmount() {
		let div = this.dropRef.current
		div.removeEventListener('dragenter', this.handleDragIn);
		div.removeEventListener('dragleave', this.handleDragOut);
		div.removeEventListener('dragover', this.handleDrag);
		div.removeEventListener('drop', this.handleDrop);
	}
	
	triggerInput = (e) => {
		e.persist();
		this.inputRef.current.click();
	}
	
	render = () => (
		<Dropspace
			triggerInput={this.triggerInput}
			handleDropFile={this.props.handleDropFile}
			addImage={this.props.addImage}
			inputRef={this.inputRef} 
			dropRef={this.dropRef}
			drag={this.state.drag}
			files={this.props.files}
		/>
	)
}
export default DropspaceContainer;