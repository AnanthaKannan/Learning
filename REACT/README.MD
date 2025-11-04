## MVC
* Model: used to write the buisness logic and manage data.
* View: used to display the data to the user (UI components).
* Controller: acts as an intermediary between Model and View, handling user input and updating the Model and View accordingly.
```jsx
// src/mvc/Controller.tsx
import React, { useState } from 'react';
import * as model from './model'; // Model
import View from './View'; // View

export const Controller: React.FC = () => {
  const [data, setData] = useState(model.getData());

  const handleUpdate = (newData: string) => {
    model.updateData(newData); // Update Model
    setData(model.getData()); // Update View
  };

  return <View data={data} onUpdate={handleUpdate} />; // Render View
};

//src/mvc/View.tsx
import React from 'react';
interface ViewProps {
  data: string;
  onUpdate: (newData: string) => void;
}
const View: React.FC<ViewProps> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
  };

  return (
    <div>
      <h1>Data: {data}</h1>
      <input type="text" value={data} onChange={handleChange} />
    </div>
  );
};
export default View;

// src/mvc/model.ts
let data = 'Initial Data';

export const getData = () => data;

export const updateData = (newData: string) => {
  data = newData;
};
```

## What happens on lazy loading
1. on initial load, only the main chunk and any immediately necessary chunks are loaded.
2. when a user navigates to a route that requires additional code, a request is made to fetch the corresponding chunk.
3. once the chunk is loaded, the application can render the new route or component.

## Difference between React Node, Element, and Component
* React Node: A React Node is a broader term that encompasses anything that can be rendered in React, including React elements, strings, numbers, fragments, portals, and arrays of nodes.
* React Element: <div>element</div>
* React Component: A React Component is a function or class that optionally accepts inputs (props) and returns a React Node. Components can be stateful or stateless and are reusable building blocks in a React application.