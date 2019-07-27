import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import BaseConfig from '../config/base-config';

export const LoggedInUser = ()=>(<div><FontAwesomeIcon icon={faUserCircle}/>{BaseConfig.userName}</div>);