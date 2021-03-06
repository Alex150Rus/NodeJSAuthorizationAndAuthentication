const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('cookie-session');

app.use(cookieParser());
/* от ключей зависит способ с помощью которого будет зашифрован идентификатор сессии
расшифровывается, конечно легко, но если кто-то на клиентской части подменит эту куку:
попытается вписать свои какие-то данные, то эти ключи помогут определить кто эту куку
выпустил: сервер или не сервер. Ключи нужно хранить в защищённом месте. Они ни в коем
случае не должны попадать на клиент. Также здес ь можно использовать публичные ssh ключи,
но обычно так не делают
*/

app.use(session({keys: ['secret']}));

/*напишем мидлвару, которая будет считать сколько раз мы загрузили страницу. 
мидлвара срабатывает на каждый запрос! - увеличение на 2 происходит, так как у
нас получается два запроса вместо одного. Браузер не только страничку запрашивает но
favicon - именно он даёт погрешность, поэтому у нас будет два запроса и один просмотр = 2))
*/
app.use((request, response, next)=>{
  let n = request.session.views || 0;
  request.session.views = ++n;
  response.end(`${n} views`);
});

app.listen(4444);