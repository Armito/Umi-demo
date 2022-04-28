import { useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEnd,
} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

interface SortableElementProps {
  value: string;
}

interface SortableListProps {
  items: string[];
}

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value }: SortableElementProps) => (
  <div>
    <DragHandle />
    {value}
  </div>
));

const SortableList = SortableContainer(({ items }: SortableListProps) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});

const SortableComponent = () => {
  const [items, setItems] = useState<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
  ]);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    console.log(arrayMoveImmutable(items, oldIndex, newIndex));
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  return <SortableList items={items} useDragHandle onSortEnd={onSortEnd} />;
};

export default SortableComponent;
