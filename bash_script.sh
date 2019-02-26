pgrep procname && echo Running 
pgrep procname || echo Not running 
killall -q -0 procname && echo Running 
pidof procname && echo Running
