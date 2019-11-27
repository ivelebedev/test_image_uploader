import React from 'react';

const Workspace = ({ onMouseDown, onMouseUp, onRemoveImage, images, select, position }) => (
	<section>
		<div className="title">Рабочая область</div>
		<div className="workspace">
				{images.map((image, i) =>
					<div className={select === i ? "workspace__item workspace__item--active" : "workspace__item"}
						key = {i} 
						draggable="true"
						onMouseUp={e => onMouseUp(e, i)}
						onMouseDown={e => onMouseDown(e, i)}
						style={ select === i ? {transform: 'translateY('+position.y+'px) translateX('+position.x+"px) translateZ(0)"} : {transform: 'translateY('+image.position.top+'px) translateX('+image.position.left+'px) translateZ(0)'}}
					>
						<img className="workspace__preview" src={image.src} alt = "" />
						<button className="btn btn--del" onClick={e => onRemoveImage(e, i)}>
							<span className="ico ico--del" />
							<span className="btn__text">Удалить</span>
						</button>
					</div>
				)}
		</div>
	</section>
)
export default Workspace;