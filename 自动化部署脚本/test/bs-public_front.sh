#!/bin/bash
user=$1
upass=$2
_dir_xiaochuang="xiaochuang_2.0"
_dir_frontend="front_v2_dist"

_http_dir="dist"

_gitPrjUrl="http://${user}:${upass}@git.yuanbaoai.com/front/front_v2_dist.git"
_branch="master"

cd ../$_dir_xiaochuang/park_frontend

if [ -e $_dir_frontend  ]
then
  tmp_xc_dir=$_dir_frontend_`date +%Y%m%d%H%M%S`
  mv $_dir_frontend  ../../../jk/tmp/$tmp_xc_dir
fi

if [ -e $_http_dir  ]
then
  tmp_http_dir=$_http_dir_`date +%Y%m%d%H%M%S`
  mv $_http_dir  ../../../jk/tmp/$tmp_http_dir
fi

echo "开始克隆前端"
git clone $_gitPrjUrl 
cd $_dir_frontend
git config --global user.email "maxuan008@qq.com"
git config --global user.name "maxuan"
git checkout -b $_branch
git pull origin $_branch 
pwd




echo "当前路径"
pwd 
ls        
         
mv $_http_dir ../
         
cd ..   
echo "上级路径"
pwd          
ls    
rm -rf $_dir_frontend

