print ("Beginning ... ")
default_registry('docker.io/huangjien')
# local_resource('build a-front', 'build.sh', dir='./a-front')
docker_build('a-front', context = './a-front/', dockerfile = './a-front/Dockerfile')
k8s_yaml('./a-front/k8s.yaml')
k8s_resource('a-front', port_forwards=['80:80', '443:443'])

print ("End!")