import React from 'react';
import loadFirebase from '../loadFirebase';

export default class EnsureLogin extends React.Component<{}> {
  public render() {
    return null;
  }
  public async componentDidMount() {
    await loadFirebase();
  }
}
