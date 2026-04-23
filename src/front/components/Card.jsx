function Card({ imageUrl, title, description, button, linkButton }) {
    return (
        <div className="glass-card p-0 h-100" style={{ width: "18rem", overflow: 'hidden' }}>
            <div className="ratio ratio-16x9">
                <img
                    src={imageUrl}
                    className="object-fit-cover"
                    alt={title}
                    style={{ transition: 'transform var(--transition-smooth)' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                />
            </div>
            <div className="card-body d-flex justify-content-between flex-column p-3">
                <div>
                    <h5 className="card-title fw-bold mb-1">{title}</h5>
                    <p className="card-text flex-grow-1 text-muted">{description}</p>
                </div>
                <div className="mt-3">
                    <a
                        href={linkButton}
                        target="_blank"
                        rel="noreferrer"
                        className="btn d-flex justify-content-center pers-primary-btn-color fw-semibold py-2"
                    >
                        {button}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;