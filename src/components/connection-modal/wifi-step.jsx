import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import styles from './connection-modal.css';

const WifiStep = props => (
    <Box className={styles.body}>
        <Box className={styles.wifiForm}>
            <div className={styles.wifiRow}>
                <label className={styles.wifiLabel}>
                    <FormattedMessage
                        defaultMessage="Device address"
                        description="Label for the WebREPL host field"
                        id="gui.connection.wifi.host"
                    />
                </label>
                <input
                    className={styles.wifiInput}
                    placeholder="192.168.1.42"
                    type="text"
                    value={props.host}
                    onChange={props.onChangeHost}
                />
            </div>
            <div className={classNames(styles.wifiRow, styles.wifiPortRow)}>
                <label className={styles.wifiLabel}>
                    <FormattedMessage
                        defaultMessage="Port"
                        description="Label for the WebREPL port field"
                        id="gui.connection.wifi.port"
                    />
                </label>
                <input
                    className={styles.wifiInput}
                    type="number"
                    value={props.port}
                    onChange={props.onChangePort}
                />
            </div>
            <div className={styles.wifiRow}>
                <label className={styles.wifiLabel}>
                    <FormattedMessage
                        defaultMessage="WebREPL password"
                        description="Label for the WebREPL password field"
                        id="gui.connection.wifi.password"
                    />
                </label>
                <input
                    className={styles.wifiInput}
                    type="password"
                    value={props.password}
                    onChange={props.onChangePassword}
                />
            </div>
            <label className={styles.wifiRemember}>
                <input
                    checked={props.remember}
                    type="checkbox"
                    onChange={props.onToggleRemember}
                />
                <FormattedMessage
                    defaultMessage="Remember the password on this computer"
                    description="Checkbox to remember the WebREPL password"
                    id="gui.connection.wifi.remember"
                />
            </label>
            <div className={styles.wifiNote}>
                <FormattedMessage
                    defaultMessage="WebREPL is not encrypted. Use it only on a trusted local network."
                    description="Warning shown in the WiFi connection form"
                    id="gui.connection.wifi.plaintextNote"
                />
            </div>
            {props.error ? (
                <div className={styles.wifiError}>
                    {props.error}
                </div>
            ) : null}
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                <FormattedMessage
                    defaultMessage="Enter the board's IP address and WebREPL password."
                    description="Instructions for the WiFi connection form"
                    id="gui.connection.wifi.instructions"
                />
            </Box>
            <Dots
                className={styles.bottomAreaItem}
                counter={0}
                total={3}
            />
            <button
                className={classNames(styles.bottomAreaItem, styles.connectionButton)}
                onClick={props.onConnect}
            >
                <FormattedMessage
                    defaultMessage="Connect"
                    description="Button to connect over WebREPL"
                    id="gui.connection.wifi.connect"
                />
            </button>
        </Box>
    </Box>
);

WifiStep.propTypes = {
    error: PropTypes.string,
    host: PropTypes.string.isRequired,
    onChangeHost: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangePort: PropTypes.func.isRequired,
    onConnect: PropTypes.func.isRequired,
    onToggleRemember: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
    remember: PropTypes.bool.isRequired
};

export default WifiStep;
