import { SimpleGrid } from "@mantine/core"

type CardGridProps<T> = {
  data: T[];
  Component: React.ComponentType<T>;
};

function CardGrid<T> ({ data, Component }: CardGridProps<T>) {
    const items = data.map((item, index) => (
        <Component key={index} {...item} />
    ))

    return (
        <SimpleGrid
            type="container"
            cols={ {base:1, xs:3, sm:4, md:6, lg:12} }
        >
            {items}
        </SimpleGrid>
    )
}

export default CardGrid