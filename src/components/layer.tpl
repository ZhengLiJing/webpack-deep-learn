<div class="layer">
    <div>this this a layer</div>
    <img src="${require('../assets/icon.png')}" />
</div>

<div class="layer">
    <div><%= name %></div>
    <% for(var i=0,len=array.length; i<len; i++) { %>
        <%= array[i] %>
    <% } %>
</div>