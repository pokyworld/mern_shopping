// to kill process blocking port
sudo kill -9 $(sudo lsof -t -i:5000)