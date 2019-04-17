#!/bin/bash
# chmod +x ./test.sh  使脚本具有执行权限

_old_domain="veilytech.com"
_new_domain="yuanbaoai.com"

_site_available="/etc/nginx/sites-available"
_sit_enabled="/etc/nginx/sites-enabled"
 
#"admin"  
for loop in "yqtest2"  "toptest"  "sktest"  "yqtest"
do
    
    echo " 开始迁移域名: $loop"
    _tmppath="/usr/share/nginx/logs/${loop}.${_new_domain}.log"
    if [  -e $_tmppath  ]
    then
       echo "源代码文件夹 $_tmppath 已经存在"
    else
     touch  ${_tmppath}
    fi

    _tmp_avil="${_site_available}/${loop}.${_old_domain}.conf"
    _target_avil="${loop}.${_new_domain}.conf"
    if [ -e $_tmp_avil ] 
    then
        cd $_site_available
        cp -r  $_tmp_avil   $_target_avil        
        ln -s /etc/nginx/sites-available/${_target_avil}   /etc/nginx/sites-enabled/${_target_avil} 
    else 
        echo "原域名配置不存在, ${loop} 迁移停止"
    fi

done

#for rootPath in
# yqtest2   "letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w  /alidata/workspace/xiaochuang_2.0/park_frontend/dist -d yqtest2.yuanbaoai.com"  
# toptest   "letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w /alidata/workspace/xiaochuang_topAdmin/dist -d toptest.yuanbaoai.com"
# sktest    "letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w /alidata/workspace/shenggaotou/park_frontend/dist -d sktest.yuanbaoai.com"
# yqtest    "letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w /alidata/workspace/xiaochuang2.0_test/xiaochuang_2.0/park_frontend/dist -d yqtest.yuanbaoai.com"
# yq    " letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w  /alidata/workspace/xiaochuang_2.0/park_frontend/dist -d  yq.yuanbaoai.com"


_lets=(
  " /alidata/workspace/xiaochuang_2.0/park_frontend/dist -d yqtest2.yuanbaoai.com"
   " /alidata/workspace/xiaochuang_topAdmin/dist -d toptest.yuanbaoai.com"
   " /alidata/workspace/shenggaotou/park_frontend/dist -d sktest.yuanbaoai.com"
   " /alidata/workspace/xiaochuang2.0_test/xiaochuang_2.0/park_frontend/dist -d yqtest.yuanbaoai.com"
)

for rootPath in "${_lets[@]}" ; do
  letsencrypt certonly --agree-tos --email maxuan008@qq.com --webroot  -w ${rootPath}
done



