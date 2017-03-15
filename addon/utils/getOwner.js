import Ember from 'ember';

const getOwner = Ember.getOwner;

export default function(object){
  if(getOwner)
    return getOwner(object);
  
  return App.__container__;
}