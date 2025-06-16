import './CustomGrid.css'

type CardGridProps<T> = {
  data: T[];
  Component: React.ComponentType<T>;
};

function CustomGrid<T>({ data, Component }: CardGridProps<T>) {
    const items = data.map((item, index) => (
        <Component key={index} {...item} />
    ))

    return (
        <div className="custom-grid">
            {items}
        </div>
    )
}

export default CustomGrid