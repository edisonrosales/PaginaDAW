from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login

def index(request):
	context = {}
	return render(request, 'users/index.html', context)

def user_info(request):
	context = {}
	usuario = request.POST.get("usuario")
	clave = request.POST.get("clave")
	user = authenticate(request, username=usuario, password=clave)
	print(user)
	if user is not None:
		login(request,user)
		return render(request,'users/usuario.html',context)
	else:
		print("adios")
