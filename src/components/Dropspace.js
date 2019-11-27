import React from 'react';

const Dropspace = ({ triggerInput, handleDropFile, addImage, inputRef, dropRef, drag, files }) => (
	<section>
		<div className="title">
			Загрука файлов 
			<button className="btn btn--m" onClick={triggerInput}>
				<span className="ico ico--add"/>
				<span className="btn__text">Добавить файл</span>
				<input className="btn__input" ref={inputRef} type="file" onChange={handleDropFile} accept="image/*" />
			</button>
		</div>
		<div
			className="dropspace"
			ref={dropRef}
		>
			{drag &&
				<div className="dropspace__drag">
					<div className="dropspace__text">Бросайте, я ловлю!</div>
				</div>
			}
			{files.map((file, i) =>
				<div className="dropspace__item" key={i}><img className="dropspace__preview" onClick={addImage} src={file.src} alt={file.name} /></div>
			)}
		</div>
	</section>
);

export default Dropspace;