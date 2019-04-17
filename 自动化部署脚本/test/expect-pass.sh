#!/usr/bin/expect  -f
set timeout 900
set password [lindex $argv 0]
set user [lindex $argv 1]
set upass [lindex $argv 2]
#spawn  su - op -c "cd /alidata/workspace/jk && ./bs-public_backend.sh "
spawn sudo ./bs-public_backend.sh ${user} ${upass}
expect "password" 
send "${password}\r"
#interact
expect eof

#su - root -c pwd
#echo "完成"


