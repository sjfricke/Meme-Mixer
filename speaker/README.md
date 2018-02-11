# Speaker TCP data spec

Here is the data that will be sent from host to speakers

- `0:0` - **Stop**
- `1:<int>` - **Play** *<int>* where *<int>* is the number of song in array
	- Example: `1:3` plays song of index 3
	- If song is paused then plays it back where left off
- `2:<int>` - **Seek** the current song to *<int>* seconds into the song
- `3:0` - **Next** song is played from list
- `4:0` - **Back** plays previous song from list
- `5:0` - **Restart** plays the current song from start
- `6:<int>` - **Volume** to set form *<int>*
 