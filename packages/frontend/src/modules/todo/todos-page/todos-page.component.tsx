import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TodoListPageComponent } from '../todo-list-page';
import { TodoDetailsPageComponent } from '../todo-details-page';
import { TodoHeaderComponent } from '../components/todo-header';

export const TodosPageComponent = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <TodoHeaderComponent />
      <Switch>
        <Route exact path={path}>
          <TodoListPageComponent />
        </Route>
        <Route path={`${path}/:todoId`}>
          <TodoDetailsPageComponent />
        </Route>
      </Switch>
    </>
  );
};
