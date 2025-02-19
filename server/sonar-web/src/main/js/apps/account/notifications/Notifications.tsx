/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { partition } from 'lodash';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  withNotifications,
  WithNotificationsProps,
} from '../../../components/hoc/withNotifications';
import { Alert } from '../../../components/ui/Alert';
import Spinner from '../../../components/ui/Spinner';
import { translate } from '../../../helpers/l10n';
import GlobalNotifications from './GlobalNotifications';
import Projects from './Projects';

export function Notifications(props: WithNotificationsProps) {
  const {
    addNotification,
    channels,
    globalTypes,
    loading,
    notifications,
    perProjectTypes,
    removeNotification,
  } = props;

  const [globalNotifications, projectNotifications] = partition(notifications, (n) => !n.project);

  return (
    <div className="account-body account-container">
      <Helmet defer={false} title={translate('my_account.notifications')} />
      <Alert variant="info">{translate('notification.dispatcher.information')}</Alert>
      <Spinner loading={loading}>
        {notifications && (
          <>
            <GlobalNotifications
              addNotification={addNotification}
              channels={channels}
              notifications={globalNotifications}
              removeNotification={removeNotification}
              types={globalTypes}
            />
            <Projects
              addNotification={addNotification}
              channels={channels}
              notifications={projectNotifications}
              removeNotification={removeNotification}
              types={perProjectTypes}
            />
          </>
        )}
      </Spinner>
    </div>
  );
}

export default withNotifications(Notifications);
