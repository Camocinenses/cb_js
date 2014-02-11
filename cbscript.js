/* FunÁıes */
/* Testando commit */
function getMes()
{
	var d = new Date();
	var meses = ['Janeiro', 'Fevereiro', 'MarÁo', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	var mes = '&copy; ' + meses[d.getMonth()] + ' ' + d.getFullYear() + ' - Camocim, Cear·, Brasil.';
	inElem('dataAtual', mes);
}
function getRegistro(i)
{
	var input = document.querySelector('#filtro');
	input.value = anuncio[i].nome;
	getPesquisa();
	setFocus();
}
function loadXML(file)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", file, false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	
	return xmlDoc;
}
function maisProximo(coordenadas)
{
	var menorDistancia = 1000;
	var maisproximo = 0;
	
	var raio = 200;
	
	var getX = function(coordenada)
	{
		var array = coordenada.split(',');
		var x = parseFloat(array[0]);
		return x;
	}
	var getY = function(coordenada)
	{
		var array = coordenada.split(',');
		var y = parseFloat(array[1]);
		return y;
	}
	
	var quadrado = function(num)
	{
		var quadrado = num * num;
		return quadrado;
	}
	
	var calcularDistancia = function(coordenadasComparacao)
	{
		var distancia = Math.sqrt(quadrado(getX(coordenadas) - getX(coordenadasComparacao)) + quadrado(getY(coordenadas) - getY(coordenadasComparacao)));
		return distancia  * 100000;
	}
	
	var distancias = new Array();
	
	for (z in anuncio)
	{
		if (anuncio[z].coordenadas != '')
		{
			var distancia = calcularDistancia(anuncio[z].coordenadas);
			if (distancia < raio && distancia != 0)
			{
				if (distancia < menorDistancia)
				{
					distancias.unshift({"id": z, "distancia": distancia});
					menorDistancia = distancia;
				}
				else
				{
					distancias.push({"id": z, "distancia": distancia});
				}
			}
		}
	}

	return distancias;
}
function Registro(coordenadas, imagem, nome, categoria, endereco, telefone, descricao, email, url, maisinf, palavrachave, banner, credenciado)
{
	this.coordenadas = coordenadas;
	this.imagem = imagem;
	this.nome = nome;
	this.categoria = categoria;
	this.endereco = endereco;
	this.telefone = telefone;
	this.descricao = descricao;
	this.email = email;
	this.url = url;
	this.maisinf= maisinf;
	this.palavrachave= palavrachave;
	this.banner = banner;
	this.credenciado = credenciado;
}

function inElem(id, conteudo)
{
	var r = true;
	try
	{
		document.getElementById(id).innerHTML = conteudo;
	}
	catch(e)
	{
		r = false;
	}
	return r;
}

function mostra(id)
{
	var r = true;
	try
	{
		document.getElementById(id).style.display = 'block';
	}
	catch(e)
	{
		r = false;
	}
	return r;
}

function oculta(id)
{
	var r = true;
	try
	{
		document.getElementById(id).style.display = 'none';
	}
	catch(e)
	{
		r = false;
	}
	return r;
}

function gerarAnimacao()
{
	var efeitos = ['blindX', 'blindY', 'blindZ', 'cover', 'curtainX', 'curtainY', 'fade', 'fadeZoom', 'growX', 'growY', 'scrollUp', 'scrollDown', 'scrollLeft', 'scrollRight', 'scrollHorz', 'scrollHorz', 'shuffle', 'slideX', 'slideY', 'turnUp', 'turnDown', 'turnLeft', 'turnRight', 'zoom'];
	$('#banner').cycle({
	  fx: efeitos[Math.floor(Math.random()*(efeitos.length))],
	  random: 1,
	  timeout: 4000
	  });
}

function gerarBanner(banners)
{
	var resultbanner= '';
	resultbanner+= '<div id="banner">';
	banners = banners.split('*');
	for (b in banners)
	{
		resultbanner+= '<div class="imgbanner" style="background: white url(\''+ banners[b] + '\'); width: 714px; height: 150px" /></div>';
	}

	resultbanner += '</div>';
	document.getElementById('resultado').innerHTML += resultbanner;
}

function removeAcento(strToReplace)
{
	str_acento= '·‡„‚‰ÈËÍÎÌÏÓÔÛÚıÙˆ˙˘˚¸Á¡¿√¬ƒ…» ÀÕÃŒœ”“’÷‘⁄Ÿ€‹«';
	str_sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
	var nova='';
	for (var i = 0; i < strToReplace.length; i++)
	{
		if (str_acento.indexOf(strToReplace.charAt(i)) != -1)
		{
			nova+=str_sem_acento.substr(str_acento.search(strToReplace.substr(i,1)),1);
		} else
		{
			nova+=strToReplace.substr(i,1);
		}
	}
	return nova;
}

function seEncontra(nome, registro)
{
	encontrado = true;

	array_nome = new Array();
	
	if (nome.length > 0)
		array_nome = nome.split(' ');

	var contemAlgo = function(str)
	{
		var result = false;
		if (removeAcento(str).toUpperCase().indexOf(removeAcento(array_nome[b]).toUpperCase()) > -1)
		{
			result = true;
		}
		return result;
	}
	for (b in array_nome)
	{
		if (!(contemAlgo(registro.nome) || contemAlgo(registro.descricao) || contemAlgo(registro.telefone) || contemAlgo(registro.endereco) || contemAlgo(registro.palavrachave) || contemAlgo(registro.url) || contemAlgo(registro.maisinf) || contemAlgo(registro.email)))
		{
			encontrado = false;
		}
	}

	return encontrado;
}

function numAnuncios()
{
	//document.getElementById('numAnuncios').innerHTML = anuncio.length;
}

function getPosicaoColuna(posicaoi)
{
	var posicao = posicaoi;
	if (posicao < 4)
	{
		posicao++
	} else
	{
		posicao = 0;
	}
	return posicao;
}

function getTelefones(telefones)
{
	array_telefones = telefones.split('/');
	var resultado = '';
	for (t in array_telefones)
	{
		resultado += '<div class="telefone destaque_tel">' + array_telefones[t] + '</div>';
	}
	return resultado;
}
function getValor(id)
{
	var r = true;
	var valor;
	try
	{
		valor = document.getElementById(id).value;
		return valor;
	}
	catch(e)
	{
		r = false;
		return r;
	}
}
function novoElemHtml(tag, atributos)
{
	var elem = document.createElement(tag);
	for (i in atributos)
	{
		elem.setAttribute(i, atributos[i]);
	}
	return elem;
}
function appendElem(local, elem)
{
	local.appendChild(elem);
}
function getPesquisa()
{
	inElem('resultado', '<div id="coluna0" class="coluna"></div><div id="coluna1" class="coluna"></div><div id="coluna2" class="coluna"></div><div id="coluna3" class="coluna"></div><div id="coluna4" class="coluna"></div>');

	var posicao = 0;
	var pesquisa = getValor('filtro');
	var c = 0;
	window.c2 = 0;
	window.q = '';
	var resultado2 = new Array();

	var limite = 15;
	for (i in anuncio)
	{
		var resultado = '';
		resultado2[i] = anuncio[i].nome;
		if (seEncontra(pesquisa, anuncio[i])) {
		q = i;
		c2++;
		//   if (c < 5) {
		resultado += '<div class="registro" onClick="setPosicao(' + i + ')" id="' + i + '" >';

		if (anuncio[i].url != '')
		{
			resultado += '<div class="url"><a href="' + anuncio[i].url + '" target="_blank">website</a></div>';
		};
		if (anuncio[i].coordenadas != '' || anuncio[i].banner != '')
		{
			resultado +='<a href="javascript:getRegistro(' + i + ')">';
		};
		if (anuncio[i].imagem != '')
		{
			resultado += '<div class="imagem" border="0" style="background-image: url(\''+ anuncio[i].imagem + '\')"></div>';
		}
		if (anuncio[i].coordenadas != '')
		{
			resultado +='</a>';
		}
		if (anuncio[i].coordenadas != '' || anuncio[i].banner != '')
		{
			resultado +='<a href="javascript:getRegistro(' + i + ')" style="text-decoration: none; color: black">';
		}
		resultado += '<div class="nome' + ((anuncio[i].imagem == '') ? ' destaque' : '') + '">' + anuncio[i].nome + '</div>';
		if (anuncio[i].coordenadas != '')
		{
			resultado +='</a>';
		}
		if (anuncio[i].maisinf != '')
		{
			resultado += '<div class="maisinf">' + anuncio[i].maisinf + '</div>';
		}
		resultado += '<div class="descricao">' + anuncio[i].descricao+ '</div>';
		resultado += "<div class=\"descricao\">" + anuncio[i].email + "</div>";
		if (anuncio[i].endereco != '')
		{
			resultado += '<div class="endereco">' + anuncio[i].endereco+ '</div>';
		}
		if (anuncio[i].telefone != '')
		{
			resultado += '<div class="telefones">' + getTelefones(anuncio[i].telefone) + '</div>';
		}
		resultado += '</div>';
		//}
		if (pesquisa.length > 0)
		{
			document.getElementById('coluna' + posicao).innerHTML += resultado;
		}
		posicao = getPosicaoColuna(posicao);
		c++;
		}
		if (c2 > limite && pesquisa != '')
		{
			break;
		}
	}
	if (pesquisa.length > 0)
	{
		mostra('cbusca');
		mostra('voltar');
		oculta('abaixaki');
		oculta('likeface');
		oculta('logo');
		oculta('autoajuda');
		document.getElementById('barra_menus').style.height = '107px';
	} else
	{
		oculta('cbusca');
		oculta('voltar');
		mostra('abaixaki');
		mostra('likeface');
		mostra('logo');
		mostra('autoajuda');
		document.getElementById('barra_menus').style.height = '107px';
	}

	resultado2.sort();
	inElem('resultado2', resultado2.join(' | '));

	if (c2 == 0)
	{
		document.getElementById('resultado').innerHTML = '<center><h3>Infelizmente n„o encontramos em nosso</br>sistema nada de relacionado ‡ "' + pesquisa + '".</h4><h3>Deseja procurar no Google?</h3><a href="http://www.google.com.br?q=' + pesquisa + ', Camocim, Cear·, Brasil" target="_blank">Sim</a>&nbsp;&nbsp;&nbsp;<a href="javascript:limparPesquisa()">N„o</a><h4>Caso queira sugerir o que vocÍ digitou acima para constar em nosso sistema, envie mensagem de texto(sms) para (88) 9410.9253 ou envie e-mail para miltonrodrigues@live.com com o que vocÍ tentou procurar e n„o encontrou.</h4></center>';
	}
	if (c2 == 1)
	{
		
		if (anuncio[q].banner != '')
		{
			//document.getElementById('cbusca').style.margin="0px 0px 0px 150px";
			gerarBanner(anuncio[q].banner);
			gerarAnimacao();
		}
		//oculta('filtro');
	} else
	{
		document.getElementById('cbusca').style.margin="0px";
		document.getElementById('filtro').style.display = 'block';
	}
	if (c2 == 1 && anuncio[q].coordenadas != '')
	{
	
		
		var proximidades = maisProximo(anuncio[q].coordenadas);
		
		if (proximidades.length > 0)
			document.getElementById("coluna0").innerHTML += "<span style=\"text-align: center; display: block;\">Proximidades:</span>";
		
		for (p in proximidades)
		{
			var proximo = document.createElement('span');
			proximo.setAttribute('style', 'font-size: 10px; text-align: center; margin: 5px; display: block; cursor: pointer;');
			proximo.setAttribute('onClick', 'getRegistro(' + proximidades[p].id + ')');
			
			proximo.innerHTML = anuncio[proximidades[p].id].nome;
			
			document.getElementById("coluna0").appendChild(proximo);
		}

		//document.getElementById('cbusca').style.margin="0px 0px 0px 150px";
		document.getElementById('resultado').innerHTML += '<div class="mapa"><div id="googleMap" style="width:695px;height:380px;"></div></div>';
		window.scrollTo(0, 0);
		gerarMapa(anuncio[q].coordenadas);
		if (anuncio[q].banner != '')
		{
			gerarAnimacao();
		}
	} else
	{

	}
	colorir();
}

function limparPesquisa()
{
	document.getElementById('filtro').value = '';
	getPesquisa();
	setFocus();
}
function setFocus()
{
	document.getElementById('filtro').focus();
}
function getNome(nome)
{
	document.getElementById('filtro').value = removeAcento(nome);
	getPesquisa();
}

function gerarMapa(coordenadas)
{
		var myCenter=new google.maps.LatLng(parseFloat(coordenadas.split(',')[0]), parseFloat(coordenadas.split(',')[1]));
		
		function initialize()
		{
			var mapProp = {center: myCenter, zoom:18, mapTypeId: google.maps.MapTypeId.HYBRID};
			
			var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
			
			var marker = new google.maps.Marker({position: myCenter, animation:google.maps.Animation.BOUNCE});
			
			marker.setMap(map);

			// Zoom to 9 when clicking on marker
			google.maps.event.addListener(marker,'click',function()
			{
				map.setZoom(19);
				map.setCenter(marker.getPosition());
			});
		};
		initialize();
		//google.maps.event.addDomListener(window, 'load', initialize);
}

function NavegadorTiozinho()
{
	alert('Seu navegador est· desatualizado! \nPor conta disso, nosso sistema n„o ir· funcionar nele.\nUtilize um navegador mais moderno! \nNosso sistema ir· redirecionar vocÍ para a p·gina do Google Chrome como sugest„o para vocÍ est· utilizando, obrigado pela compreens„o.');
	window.location.href="https://www.google.com/intl/pt-BR/chrome/browser/?hl=pt-BR&brand=CHMI";
}

function diversao()
{
/*	if (posicaoAnuncio == 0) {
		document.getElementById('anuncie').style.left = '667px';
		posicaoAnuncio = 1;
	} else {
		document.getElementById('anuncie').style.left = '0px';
		posicaoAnuncio = 0;		
	}*/
}
function colorir()
{
	try
	{
		var cores = new Array();
		cores.push('#f00');
		cores.push('#f60');
		cores.push('#fc0');
		cores.push('#693');
		cores.push('#039');
		cores.push('#309');

		var destaque = document.getElementsByClassName('destaque');
		for (i in destaque)
		{
			try
			{
				var random = Math.floor(Math.random()*(cores.length));
				if (pcor == random)
				{
					i--;;
				} else
				{
					pcor = random;
				}
				var cor = cores[pcor];
				destaque[i].style.background = cor;
				destaque[i].style.color = 'white';
			} catch(e)
			{

			}
		}
	} catch(e)
	{

	}
}

function voltar()
{
	if (parametros.length > 1)
	{
		window.location.href='http://cbusca.blogspot.com';
	} else
	{
		var retorno = document.getElementById('filtro').value;
		limparPesquisa();
		if (posicao != 0)
		{
			//document.getElementById(posicao).scrollIntoView(false);
		}
	}
	posicao = 0;
}
function setPosicao(p)
{
	posicao = p;
	return p;
}
function setParceiros(array)
{
	parceiros.unshift(array);
}

function getParceiros()
{
	var retorno = '<div id="credenciados">';
	for (i in parceiros)
	{
		if (parceiros[i].imagem != '')
		{
			retorno+= '<div style="width: 50px; height: 50px; float: left; margin: 12px; cursor: pointer"><img src="' + parceiros[i].imagem + '" width="50" style="border-radius: 8px" onClick="getRegistro(' + i + ')"/></div>';
		}
	}
	retorno += '</div>';
	document.getElementById('parceiros').innerHTML = retorno;
}


/* fim FunÁıes */


mostra('carregamento');
//document.getElementsByTagName('body')[0].style.background="#e6e6e6  url('http://3.bp.blogspot.com/-OYiEHV8J2Rc/Ui-b3SD5-2I/AAAAAAAABhQ/gOIfQNAumTo/s1600/fundo3.png') center center repeat-y fixed";
var parceiros = new Array();
var url = window.location.href;
var parametros = url.split('?');
var posicao = 0;

getMes();

var resultado = '';
var anuncio = new Array();
var prefeitura = '';
var brasaoEstado = '';

var xmlDoc = loadXML("http://dl.dropboxusercontent.com/s/3izqd2m9ht25csa/registros.xml");
var x = xmlDoc.getElementsByTagName("registro");
for (var i = 0; i < x.length; i++)
{
	var valores = {"coordenadas": "", "imagem": "", "nome": "", "endereco": "", "telefone": "", "descricao": "", "email": "", "url": "", "maisinf": "", "palavraschave": "", "banner": "", "credenciado": ""};
	var categoria = '';
	for (z in valores)
	{
		if (x[i].getElementsByTagName(z)[0].childNodes.length > 0)
		valores[z] = x[i].getElementsByTagName(z)[0].childNodes[0].nodeValue;
	}
	categoria = x[i].getAttribute("categoria");
	anuncio.push(new Registro(valores['coordenadas'], valores['imagem'], valores['nome'], categoria, valores['endereco'], valores['telefone'], valores['descricao'], valores['email'], valores['url'], valores['maisinf'], valores['palavraschave'], valores['banner'], valores['credenciado']));
}

getPesquisa();
numAnuncios();


var posicaoAnuncio = 0;

//colorir();
document.getElementsByTagName('body')[0].style.display = 'block';

for (i in anuncio)
{
	if (anuncio[i].credenciado)
	{
		setParceiros(anuncio[i]);
	}
}
oculta('carregamento');


if (parametros.length > 1)
{
	getNome(decodeURIComponent(parametros[1]));
}

