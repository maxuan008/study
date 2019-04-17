#!/bin/bash
user=$1
upass=$2

_dir_xiaochuang="xiaochuang_2.0"

# _gitPrjUrl="http://${user}:${upass}@git.yuanbaoai.com/backend/xiaochuang_2.0.git"
# _branch="xc_chongqing_v3"

_gitPrjUrl="http://${user}:${upass}@180.76.104.23:8090/xc/xiaochuang_2.0.git"
_branch="xc_chongqing"


if [ -e $_dir_xiaochuang  ]
then
  tmp_xc_dir=xc_jk_`date +%Y%m%d%H%M%S`
  mv _dir_xiaochuang  $tmp_xc_dir

fi


sh ./conf.sh

echo "开始克隆小创项目"
git clone $_gitPrjUrl 

cd $_dir_xiaochuang
git config --global user.email "maxuan008@qq.com"
git config --global user.name "maxuan"
git checkout -b $_branch
git pull origin $_branch 


echo "开始转移相应的文件"
pwd
cd ../..
pwd


cp -r  ./$_dir_xiaochuang/park_backend/node_modules    ./jk/$_dir_xiaochuang/park_backend/
cp -r  ./$_dir_xiaochuang/admin_backend/node_modules   ./jk/$_dir_xiaochuang/admin_backend/
cp -r ./$_dir_xiaochuang/db/node_modules   ./jk/$_dir_xiaochuang/db/
cp -r ./$_dir_xiaochuang/park_backend/file   ./jk/$_dir_xiaochuang/park_backend/
cp -r ./$_dir_xiaochuang/node_modules  ./jk/$_dir_xiaochuang/


# cp -r ./xiaochuang_2.0/xiaochuang_topAdmin/node_modules ./jk/xiaochuang_2.0/xiaochuang_topAdmin/
# cp -r  ./xiaochuang_2.0/park_frontend/node_modules   ./jk/xiaochuang_2.0/park_frontend/
# cp -r ./xiaochuang_2.0/xiaochuang_topAdmin/dist ./jk/xiaochuang_2.0/xiaochuang_topAdmin/
# cp -r ./xiaochuang_2.0/park_frontend/dist ./jk/xiaochuang_2.0/park_frontend/



# mv $_dir_xiaochuang  $_dir_xiaochuang_$ls_date

cd ./jk
cp -r conf/admin_backend/config/config.prod.js  $_dir_xiaochuang/admin_backend/config/
cp -r conf/db/config/config.prod.js  $_dir_xiaochuang/db/config/
cp -r conf/park_backend/config/config.prod.js  $_dir_xiaochuang/park_backend/config/

if [ ! -e ./tmp ]; then mkdir tmp  ; fi;

ls_date=`date +%Y%m%d%h%H%M%S`
echo $_dir_xiaochuang_$ls_date

mv  ../$_dir_xiaochuang   ./tmp/$_dir_xiaochuang_$ls_date
mv  $_dir_xiaochuang ../

cd ../$_dir_xiaochuang/admin_backend
npm run restart-prod

cd ../park_backend
npm run restart-prod

echo "部署前端"
cd ../../jk
sh ./bs-public_front.sh ${user} ${upass}

echo "完成"
#mv xiaochuang_2.0 xiaochuang_2.0_{$ls_date}


