import "./styles.css";
const Card = () => {
    return (
        <div className="card">
            <div className="card-left">
                <div className="card-tags">
                    <span className="tag">Tag1</span>
                    <span className="tag">Tag2</span>
                    <span className="tag">Tag3</span>
                </div>
                <h1 className="card-title">Lorem Ipsum</h1>
                <p className="card-data">12/2024</p>
                <p className="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque ante lorem, pretium faucibus dolor ornare nec. Donec elit sapien, ornare at ex aliquam, consequat semper magna. Nam sit amet consequat urna. Vivamus nec nisi enim. Vestibulum lobortis sem sed justo imperdiet, non finibus massa viverra. </p>
                <button className="card-button">Read More</button>
            </div>
            <div className="card-right">
                <img src="https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg"></img>
            </div>
        </div>
    );
};

export default Card;
