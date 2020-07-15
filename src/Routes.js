import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ModalSwitch, ModalRoute } from 'react-router-modal-gallery';
import Malfunctions from './components/malfunction/Malfunctions';
import Malfunction from './components/malfunction/Malfunction';
import Jumpers from './components/jumpers/Jumpers';
import Jumper from './components/jumpers/Jumper';

import Modal from './components/modal/Modal';
import Notes from './components/notes/Notes';
import { withRouter } from 'react-router';
import EditMalfunction from './components/malfunction/EditMalfunction';
import EditJumper from './components/jumpers/EditJumper';

const routes = [
  {
    exact: true,
    path: '/malfunctions',
    component: Malfunctions,
  },
  {
    defaultParentPath: '/malfunctions',
    match: /^\/malfunctions\/[^/]+$/,
    modal: true,
    path: '/malfunctions/:id',
    component: Malfunction,
    header: 'Просмотр неисправности',
  },
  {
    defaultParentPath: '/malfunctions/:id',
    match: /^\/malfunctions\/[^/]+\/edit$/,
    modal: true,
    path: '/malfunctions/:id/edit',
    component: EditMalfunction,
    header: 'Редактирование неисправности',
  },

  {
    exact: true,
    path: '/jumpers',
    component: Jumpers,
  },
  {
    defaultParentPath: '/jumpers',
    match: /^\/jumpers\/[^/]+$/,
    modal: true,
    path: '/jumpers/:id',
    component: Jumper,
    header: 'Просмотр перемычки',
  },
  {
    defaultParentPath: '/jumpers/:id',
    match: /^\/jumpers\/[^/]+\/edit$/,
    modal: true,
    path: '/jumpers/:id/edit',
    component: EditJumper,
    header: 'Редактирование перемычки',
  },

  // {
  //   exact: true,
  //   // modal: true,
  //   path: '/jumpers',
  //   component: Jumpers,
  // },

  // {
  //   defaultParentPath: '/directors',
  //   modal: true,
  //   path: '/directors/:id',
  //   component: Director
  // },

  {
    // modal: true,
    exact: true,
    path: '/notes',
    component: Notes,
  },
  {
    path: '*',
    render: () => <Redirect to='/malfunctions' />,
  },
];

export const Routes = (props) => {
  // const actualRoutes = routes.map((route) => {
  //   if (
  //     route.path.startsWith('/malfunctions/') &&
  //     props.location.pathname.startsWith('/malfunctions/')
  //   ) {
  //     return { ...route, path: props.location.pathname };
  //   } else {
  //     return route;
  //   }
  // });

  const modalRoutes = routes
    .filter((route) => route.modal)
    .filter((route) => props.location.pathname.match(route.match))
    .map((route) => <Route key={route.path} {...route} />);

  const modalHeader = routes
    .filter((route) => route.modal)
    .filter((route) => props.location.pathname.match(route.match));

  console.log(props);

  return (
    <div>
      <ModalSwitch
        renderModal={({ open, redirectToBack }) => (
          <Modal
            open={open}
            scroll='body'
            onExited={redirectToBack}
            header={modalHeader[0].header}
          >
            {modalRoutes}
          </Modal>
        )}
      >
        {routes.map((route) =>
          route.modal ? (
            <ModalRoute key={route.path} {...route} />
          ) : (
            <Route key={route.path} {...route} />
          )
        )}
      </ModalSwitch>
    </div>
  );
};

export default withRouter(Routes);
