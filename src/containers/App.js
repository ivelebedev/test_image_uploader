import React from 'react';
import DropspaceContainer from './DropspaceContainer';
import Workspace from '../components/Workspace';

class App extends React.Component {
	
	state = {
		files: [],
		images: [],
		position: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
		coord: { x: 0, y: 0 },
		select: null,
	}
	
	handleDrop = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (!files[i].name) return
			let name = files[i].name;
			const reader = new FileReader();
			reader.readAsDataURL(files[i]);
			reader.onload = (e) => {
				const source = e.target.result;
				this.setState({
					files: [...this.state.files, {name: name, src: source}]
				});
			}
		}
	}
	
	handleDropFile= (e) => {
		let files = e.target.files;
		this.handleDrop(files);
	}
	
	addImage = (e) => {
		this.setState({
			images: [...this.state.images, {src: e.target.src, position: { top: 0, left: Math.random()*724 } }]
		});
	}
	
	removeImage = (e, i) => {
		this.setState({
			select: null,
			images: this.state.images.filter((item, index) => index !== i)
		});
	}
	
	handleMouseMove = (e) => {
		const { coord, offset } = this.state;
		let x = coord.x+e.clientX-offset.x;
		let y = coord.y+e.clientY-offset.y;
		this.setState({
			position: {x: x, y: y}
		});
		return false;
	}
	
	handleMouseUp = (e, i) => {
		e.preventDefault();
		const { select, coord, offset } = this.state;
		if(select !== null) {
			let y = coord.y + e.clientY - offset.y;
			let x = coord.x + e.clientX - offset.x;
			this.setState({
				images: this.state.images.map((image, index) => 
					index === i ? { src: image.src, position: { top: y, left: x } }  :
					image
				)
			});
			document.removeEventListener('mousemove', this.handleMouseMove);
		}
		return false;
	}
	
	handleMouseDown = (e, i) => {
		e.preventDefault();
		const image = this.state.images[i];
		
		let offsetX = e.clientX, offsetY = e.clientY;
		
		let coordX = parseInt(image.position.left), coordY = parseInt(image.position.top);
		
		this.setState({
			select: i,
			offset: {x: offsetX, y: offsetY},
			coord: {x: coordX, y: coordY},
			position: {x: coordX, y: coordY}
		});
		document.addEventListener('mousemove', this.handleMouseMove);
		return false;
	}
	
	render = () => (
		<div className="container">
			<Workspace 
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onRemoveImage={this.removeImage}
				images={this.state.images}
				select={this.state.select}
				position={this.state.position}
			/>
			<DropspaceContainer 
				handleDrop={this.handleDrop} 
				handleDropFile={this.handleDropFile} 
				addImage={this.addImage} 
				files={this.state.files} 
			/>
		</div>
	)
}
export default App;
