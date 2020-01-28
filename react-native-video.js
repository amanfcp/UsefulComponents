import React, {
    Component
  } from 'react';
  
  import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  
  import Video from 'react-native-video';
  
  export default class VideoPlayer extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
      };
    }
    
    onLoad = (data) => {
      this.setState({ duration: data.duration });
    };
  
    onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    };
  
    onEnd = () => {
      this.setState({ paused: true })
      this.video.seek(0)
    };
  
    onAudioBecomingNoisy = () => {
      this.setState({ paused: true })
    };
  
    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
      this.setState({ paused: !event.hasAudioFocus })
    };
  
    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };
  
    render() {
      const flexCompleted = this.getCurrentTimePercentage() * 100;
      const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
  
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.fullScreen}
            onPress={() => this.setState({ paused: !this.state.paused })}
          >
            <Video
              ref={(ref) => { this.video = ref }}
              source={require('../../Video/exampleVideo.mp4')}
              style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
            />
          </TouchableOpacity>
          <View style={styles.controls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fullScreen: {
      width: "100%",
      height: 220,
      backgroundColor: '#2c2c2f',
    },
    controls: {
      backgroundColor: '#2c2c2f',
      width: '100%',
      height: 20,
    },
    progress: {
      flex: 1,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    innerProgressCompleted: {
      height: 20,
      backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
      height: 20,
      backgroundColor: '#2c2c2f',
    },
  });
  