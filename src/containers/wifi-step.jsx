import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import WifiStepComponent from '../components/connection-modal/wifi-step.jsx';
import {loadWebReplConfig} from '../lib/webrepl-connection';

class WifiStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeHost',
            'handleChangePort',
            'handleChangePassword',
            'handleToggleRemember',
            'handleConnect'
        ]);
        const saved = props.initialConfig || loadWebReplConfig(props.deviceId);
        this.state = {
            host: saved.host || '',
            port: String(saved.port || '8266'),
            password: saved.password || '',
            remember: !!saved.remember,
            error: null
        };
    }
    handleChangeHost (e) {
        this.setState({host: e.target.value, error: null});
    }
    handleChangePort (e) {
        this.setState({port: e.target.value, error: null});
    }
    handleChangePassword (e) {
        this.setState({password: e.target.value, error: null});
    }
    handleToggleRemember (e) {
        this.setState({remember: e.target.checked});
    }
    handleConnect () {
        const host = this.state.host.trim();
        const port = parseInt(this.state.port, 10);
        if (!host) {
            this.setState({error: 'Please enter the device IP address or host name.'});
            return;
        }
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            this.setState({error: 'Please enter a valid port (1-65535).'});
            return;
        }
        const peripheralId = host.includes(':') ? `[${host}]:${port}` : `${host}:${port}`;
        this.props.onConnecting(
            peripheralId,
            host,
            {
                host: host,
                port: port,
                password: this.state.password,
                remember: this.state.remember
            }
        );
    }
    render () {
        return (
            <WifiStepComponent
                error={this.state.error}
                host={this.state.host}
                password={this.state.password}
                port={this.state.port}
                remember={this.state.remember}
                onChangeHost={this.handleChangeHost}
                onChangePassword={this.handleChangePassword}
                onChangePort={this.handleChangePort}
                onConnect={this.handleConnect}
                onToggleRemember={this.handleToggleRemember}
            />
        );
    }
}

WifiStep.propTypes = {
    deviceId: PropTypes.string.isRequired,
    initialConfig: PropTypes.shape({
        host: PropTypes.string,
        port: PropTypes.number,
        password: PropTypes.string,
        remember: PropTypes.bool
    }),
    onConnecting: PropTypes.func.isRequired
};

export default WifiStep;
