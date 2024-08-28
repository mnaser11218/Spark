import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/user-profile">
        <Translate contentKey="global.menu.entities.userProfile" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/spark">
        <Translate contentKey="global.menu.entities.spark" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/hashtag">
        <Translate contentKey="global.menu.entities.hashtag" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/mentions">
        <Translate contentKey="global.menu.entities.mentions" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
